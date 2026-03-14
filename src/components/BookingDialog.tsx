"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { TimeSlot, Service } from "@/types";

type BookingStep = "date-time-selection" | "enter-details" | "success";

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
}

export default function BookingDialog({ isOpen, onClose, service }: BookingDialogProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<BookingStep>("date-time-selection");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookingForm, setBookingForm] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    notes: "",
  });
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setBookingForm((prev) => ({
        ...prev,
        clientName: prev.clientName || user.displayName || "",
        clientEmail: prev.clientEmail || user.email || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    if (service && selectedDate) {
      fetchAvailableSlots();
    }
  }, [service, selectedDate]);

  const fetchAvailableSlots = async () => {
    if (!service || !selectedDate) return;

    setLoadingSlots(true);
    try {
      const response = await fetch(
        `/api/slots?date=${selectedDate}&service=${service.title}`
      );
      const data = await response.json();

      if (data.success) {
        setAvailableSlots(data.slots);
      } else {
        setError(data.error || "Failed to fetch available slots");
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
      setError("Failed to fetch available slots");
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setCurrentStep("enter-details");
  };

  const handleBackToDateTime = () => {
    setCurrentStep("date-time-selection");
    setSelectedSlot(null);
    setError("");
  };

  const handleBooking = async () => {
    if (
      !service ||
      !selectedSlot ||
      !bookingForm.clientName ||
      !bookingForm.clientEmail ||
      !bookingForm.clientPhone
    ) {
      setError("Please fill in all required fields");
      return;
    }

    if (!user) {
      sessionStorage.setItem('pendingBooking', JSON.stringify({
        service: service,
        slot: selectedSlot,
        form: bookingForm
      }));
      router.push("/login?redirect=/book");
      return;
    }

    setIsBooking(true);
    setError("");

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.uid,
          service: service.title,
          date: selectedSlot.date,
          time: selectedSlot.time,
          duration: selectedSlot.duration,
          clientName: bookingForm.clientName,
          clientEmail: bookingForm.clientEmail,
          clientPhone: bookingForm.clientPhone,
          notes: bookingForm.notes,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCurrentStep("success");
        sessionStorage.removeItem('pendingBooking');
      } else {
        setError(data.error || "Failed to book appointment");
      }
    } catch (error) {
      console.error("Booking error:", error);
      setError("Failed to book appointment. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "pm" : "am";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes}${ampm}`;
  };

  const formatTimeRange = (timeString: string, duration: number) => {
    const [hours, minutes] = timeString.split(":");
    const startHour = parseInt(hours);
    const startMin = parseInt(minutes);

    const endMin = startMin + duration;
    const endHour = startHour + Math.floor(endMin / 60);
    const finalEndMin = endMin % 60;

    const startAmpm = startHour >= 12 ? "pm" : "am";
    const endAmpm = endHour >= 12 ? "pm" : "am";
    const start12 = startHour % 12 || 12;
    const end12 = endHour % 12 || 12;

    const startTime = `${start12}:${String(startMin).padStart(2, '0')}${startAmpm}`;
    const endTime = `${end12}:${String(finalEndMin).padStart(2, '0')}${endAmpm}`;

    return `${startTime} - ${endTime}`;
  };

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    return { daysInMonth, startDayOfWeek, year, month };
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isDateAvailable = (date: Date) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date >= tomorrow;
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    const selected = new Date(selectedDate + 'T00:00:00');
    return date.getDate() === selected.getDate() &&
      date.getMonth() === selected.getMonth() &&
      date.getFullYear() === selected.getFullYear();
  };

  const handleDateClick = (date: Date) => {
    if (!isDateAvailable(date)) return;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    setSelectedDate(dateString);
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleClose = () => {
    setCurrentStep("date-time-selection");
    setSelectedDate("");
    setSelectedSlot(null);
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      ></div>

      {/* Dialog */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-5xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr]">

            {/* Left Sidebar - Brand Info */}
            <div className="bg-white border-r border-charcoal/5 p-8 lg:p-12">
              <div className="mb-8">
                <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mb-6">
                  <span className="text-2xl">🧠</span>
                </div>
                <h3 className="text-xs font-semibold text-charcoal/40 mb-2 uppercase tracking-widest font-montserrat">
                  Mantrana | Therapy by Mohana Rupa
                </h3>
                <h2 className="text-3xl font-bold text-charcoal mb-4 font-awesome-serif uppercase tracking-wider">
                  {service.title}
                </h2>
                <div className="flex items-center text-charcoal/60 mb-6 font-montserrat font-medium">
                  <svg className="w-5 h-5 mr-3 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{service.duration} min</span>
                </div>
                {selectedSlot && (
                  <div className="mt-8 p-6 bg-background rounded-2xl border border-charcoal/5 shadow-inner">
                    <div className="font-montserrat">
                      <p className="text-xs uppercase tracking-widest text-charcoal/40 font-bold mb-3">Selected Slot</p>
                      <div className="flex items-start">
                        <svg className="w-5 h-5 mr-3 text-emerald flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <p className="text-base font-bold text-charcoal">
                            {formatTimeRange(selectedSlot.time, service.duration)}
                          </p>
                          <p className="text-sm text-charcoal/60 font-medium">
                            {formatDate(selectedSlot.date)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Content Area */}
            <div className="p-8 lg:p-12 max-h-[85vh] overflow-y-auto bg-white">

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 text-charcoal/20 hover:text-charcoal transition-colors p-2 hover:bg-charcoal/5 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Step 1: Date & Time Selection */}
              {currentStep === "date-time-selection" && (
                <div>
                  <div className="mb-10">
                    <h1 className="text-4xl font-bold text-charcoal mb-3 font-awesome-serif uppercase tracking-wider">
                      Select Date & Time
                    </h1>
                    <p className="text-charcoal/60 font-montserrat font-medium">
                      Choose an available time slot for your session
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-10">
                    {/* Custom Calendar */}
                    <div>
                      <div className="bg-white rounded-[20px] border border-charcoal/5 p-6 shadow-soft">
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-8">
                          <button
                            onClick={previousMonth}
                            className="p-3 hover:bg-emerald/10 text-emerald rounded-xl transition-all"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <h3 className="text-xl font-bold text-charcoal font-awesome-serif tracking-wide">
                            {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                          </h3>
                          <button
                            onClick={nextMonth}
                            className="p-3 hover:bg-emerald/10 text-emerald rounded-xl transition-all"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>

                        {/* Day Labels */}
                        <div className="grid grid-cols-7 gap-3 mb-4">
                          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
                            <div key={day} className="text-center text-[10px] font-bold text-charcoal/30 py-2 tracking-widest font-montserrat">
                              {day}
                            </div>
                          ))}
                        </div>

                        {/* Calendar Days */}
                        <div className="grid grid-cols-7 gap-3">
                          {(() => {
                            const { daysInMonth, startDayOfWeek, year, month } = getDaysInMonth(currentMonth);
                            const days = [];

                            // Adjust startDayOfWeek: Sunday = 0, but we want Monday = 0
                            const adjustedStart = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

                            // Empty cells before first day
                            for (let i = 0; i < adjustedStart; i++) {
                              days.push(<div key={`empty-${i}`} className="aspect-square" />);
                            }

                            // Days of the month
                            for (let day = 1; day <= daysInMonth; day++) {
                              const date = new Date(year, month, day);
                              const isAvailable = isDateAvailable(date);
                              const isTodayDate = isToday(date);
                              const isSelected = isDateSelected(date);

                              days.push(
                                <button
                                  key={day}
                                  onClick={() => handleDateClick(date)}
                                  disabled={!isAvailable}
                                  className={`
                                    aspect-square rounded-full flex items-center justify-center text-sm font-bold transition-all relative font-montserrat
                                    ${isSelected
                                      ? 'bg-emerald text-white shadow-lg shadow-emerald/20 translate-y-[-2px]'
                                      : isAvailable
                                        ? 'bg-emerald/5 text-emerald hover:bg-emerald hover:text-white hover:translate-y-[-2px]'
                                        : 'text-charcoal/10 cursor-not-allowed'
                                    }
                                    ${isTodayDate && !isSelected ? 'ring-2 ring-emerald ring-offset-2' : ''}
                                  `}
                                >
                                  {day}
                                  {isTodayDate && !isSelected && (
                                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald rounded-full"></span>
                                  )}
                                </button>
                              );
                            }

                            return days;
                          })()}
                        </div>
                      </div>
                    </div>

                    {/* Time Slots */}
                    {selectedDate && (
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <label className="block text-xs font-bold text-charcoal/40 mb-5 uppercase tracking-widest font-montserrat">
                          Available Times for {formatDate(selectedDate)}
                        </label>
                        {loadingSlots ? (
                          <div className="text-center py-12">
                            <div className="animate-spin h-10 w-10 border-b-2 border-emerald mx-auto mb-4"></div>
                            <p className="text-charcoal/40 font-montserrat text-sm">Finding best moments...</p>
                          </div>
                        ) : availableSlots.length > 0 ? (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-80 overflow-y-auto pr-3 scrollbar-custom">
                            {availableSlots.map((slot, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleTimeSlotSelect(slot)}
                                className="px-5 py-4 border-2 border-emerald/20 text-emerald rounded-2xl hover:bg-emerald hover:text-white hover:border-emerald transition-all font-bold font-montserrat text-sm"
                              >
                                {formatTime(slot.time)}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12 bg-background rounded-[20px] border border-dashed border-charcoal/10">
                            <p className="text-charcoal/40 font-montserrat font-medium">
                              No slots available for this date
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Enter Details */}
              {currentStep === "enter-details" && selectedSlot && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <button
                    onClick={handleBackToDateTime}
                    className="flex items-center text-emerald hover:text-emerald/80 mb-10 font-bold text-xs uppercase tracking-widest transition-all hover:translate-x-[-4px]"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Selection
                  </button>

                  <h1 className="text-4xl font-bold text-charcoal mb-3 font-awesome-serif uppercase tracking-wider">
                    Your Details
                  </h1>
                  <p className="text-charcoal/60 font-montserrat font-medium mb-10">
                    Please fill in your information to complete the booking
                  </p>

                  {error && (
                    <div className="mb-8 p-5 bg-red-50 border border-red-100 rounded-2xl animate-shake">
                      <p className="text-red-800 text-sm font-medium font-montserrat">{error}</p>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-charcoal/40 mb-3 uppercase tracking-widest font-montserrat">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={bookingForm.clientName}
                          onChange={(e) =>
                            setBookingForm((prev) => ({
                              ...prev,
                              clientName: e.target.value,
                            }))
                          }
                          className="w-full px-5 py-4 bg-background border border-charcoal/10 rounded-2xl focus:ring-2 focus:ring-emerald/20 focus:border-emerald outline-none transition-all font-montserrat font-medium"
                          placeholder="Jane Doe"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-charcoal/40 mb-3 uppercase tracking-widest font-montserrat">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={bookingForm.clientEmail}
                          onChange={(e) =>
                            setBookingForm((prev) => ({
                              ...prev,
                              clientEmail: e.target.value,
                            }))
                          }
                          className="w-full px-5 py-4 bg-background border border-charcoal/10 rounded-2xl focus:ring-2 focus:ring-emerald/20 focus:border-emerald outline-none transition-all font-montserrat font-medium"
                          placeholder="jane@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-charcoal/40 mb-3 uppercase tracking-widest font-montserrat">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={bookingForm.clientPhone}
                        onChange={(e) =>
                          setBookingForm((prev) => ({
                            ...prev,
                            clientPhone: e.target.value,
                          }))
                        }
                        className="w-full px-5 py-4 bg-background border border-charcoal/10 rounded-2xl focus:ring-2 focus:ring-emerald/20 focus:border-emerald outline-none transition-all font-montserrat font-medium"
                        placeholder="+91 XXXXX XXXXX"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-charcoal/40 mb-3 uppercase tracking-widest font-montserrat">
                        Add Notes (Optional)
                      </label>
                      <textarea
                        value={bookingForm.notes}
                        onChange={(e) =>
                          setBookingForm((prev) => ({
                            ...prev,
                            notes: e.target.value,
                          }))
                        }
                        rows={4}
                        className="w-full px-5 py-4 bg-background border border-charcoal/10 rounded-2xl focus:ring-2 focus:ring-emerald/20 focus:border-emerald outline-none transition-all font-montserrat font-medium resize-none"
                        placeholder="What's on your mind? Share any topics you'd like to discuss..."
                      ></textarea>
                    </div>

                    <div className="pt-6">
                      <p className="text-xs text-charcoal/40 font-montserrat mb-8 font-medium leading-relaxed">
                        By proceeding, you confirm that you have read and agree to our <Link href="/terms" className="text-emerald hover:underline">Terms of Use</Link> and <Link href="/privacy" className="text-emerald hover:underline">Privacy Notice</Link>.
                      </p>
                      <button
                        onClick={handleBooking}
                        disabled={isBooking}
                        className="w-full bg-charcoal text-white py-5 rounded-2xl font-bold hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm uppercase tracking-widest shadow-lg shadow-charcoal/20"
                      >
                        {isBooking ? (
                          <span className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Confirming...
                          </span>
                        ) : (
                          "Book Appointment"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Success */}
              {currentStep === "success" && (
                <div className="text-center py-12 animate-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-emerald/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <svg className="w-12 h-12 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h1 className="text-4xl font-bold text-charcoal mb-4 font-awesome-serif uppercase tracking-wider">
                    Confirmed!
                  </h1>
                  <p className="text-charcoal/60 font-montserrat font-medium mb-12 max-w-md mx-auto leading-relaxed">
                    Your session has been successfully booked. A confirmation email with details is on its way to your inbox.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => router.push("/account")}
                      className="px-8 py-5 bg-emerald text-white rounded-2xl hover:bg-emerald/90 transition-all font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald/20"
                    >
                      View My Dashboard
                    </button>
                    <button
                      onClick={handleClose}
                      className="px-8 py-5 bg-background text-charcoal/60 rounded-2xl hover:bg-charcoal/5 transition-all font-bold text-xs uppercase tracking-widest border border-charcoal/10"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
