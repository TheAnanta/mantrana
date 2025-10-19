"use client";

import { useState, useEffect } from "react";
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
            <div className="bg-white border-r border-gray-200 p-8 lg:p-12">
              <div className="mb-8">
                <div className="w-16 h-16 rounded-full bg-moss/10 flex items-center justify-center mb-4">
                  <span className="text-2xl">🧠</span>
                </div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  Mantrana by Mohana Rupa
                </h3>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h2>
                <div className="flex items-center text-gray-600 mb-4">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{service.duration} min</span>
                </div>
                {selectedSlot && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start mb-2">
                      <svg className="w-5 h-5 mr-2 text-gray-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {formatTimeRange(selectedSlot.time, service.duration)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatDate(selectedSlot.date)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Content Area */}
            <div className="p-8 lg:p-12 max-h-[80vh] overflow-y-auto">
              
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Step 1: Date & Time Selection */}
              {currentStep === "date-time-selection" && (
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Select a Date & Time
                  </h1>
                  <p className="text-gray-600 mb-8">
                    Choose an available time slot for your session
                  </p>

                  <div className="grid grid-cols-1 gap-8">
                    {/* Custom Calendar */}
                    <div>
                      <div className="bg-white rounded-lg border border-gray-200 p-4">
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-6">
                          <button
                            onClick={previousMonth}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                          </h3>
                          <button
                            onClick={nextMonth}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>

                        {/* Day Labels */}
                        <div className="grid grid-cols-7 gap-2 mb-2">
                          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
                            <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                              {day}
                            </div>
                          ))}
                        </div>

                        {/* Calendar Days */}
                        <div className="grid grid-cols-7 gap-2">
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
                                    aspect-square rounded-full flex items-center justify-center text-sm font-medium transition-all relative
                                    ${isSelected 
                                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                      : isAvailable
                                      ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                      : 'text-gray-400 cursor-not-allowed'
                                    }
                                    ${isTodayDate && !isSelected ? 'ring-2 ring-blue-600 ring-offset-2' : ''}
                                  `}
                                >
                                  {day}
                                  {isTodayDate && !isSelected && (
                                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></span>
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
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Available Times
                        </label>
                        {loadingSlots ? (
                          <div className="text-center py-8">
                            <div className="animate-spin h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                            <p className="text-gray-600">Loading slots...</p>
                          </div>
                        ) : availableSlots.length > 0 ? (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-2">
                            {availableSlots.map((slot, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleTimeSlotSelect(slot)}
                                className="px-4 py-3 border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                              >
                                {formatTime(slot.time)}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-center py-8 text-gray-500">
                            No slots available for this date
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Enter Details */}
              {currentStep === "enter-details" && selectedSlot && (
                <div>
                  <button
                    onClick={handleBackToDateTime}
                    className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Enter Details
                  </h1>
                  <p className="text-gray-600 mb-8">
                    Please fill in your information to complete the booking
                  </p>

                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm">{error}</p>
                    </div>
                  )}

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Name *
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
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Email *
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
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="email@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
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
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+91 XXXXX XXXXX"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Please share anything that will help prepare for our meeting.
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
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Any specific topics you'd like to discuss..."
                      ></textarea>
                    </div>

                    <div className="pt-4">
                      <p className="text-sm text-gray-600 mb-4">
                        By proceeding, you confirm that you have read and agree to our terms of use and privacy notice.
                      </p>
                      <button
                        onClick={handleBooking}
                        disabled={isBooking}
                        className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg"
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
                            Processing...
                          </span>
                        ) : (
                          "Schedule Event"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Success */}
              {currentStep === "success" && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Confirmed!
                  </h1>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Your appointment has been successfully booked. You will receive a confirmation email shortly.
                  </p>
                  <div className="flex gap-4 justify-center flex-wrap">
                    <button
                      onClick={() => router.push("/account")}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      View My Appointments
                    </button>
                    <button
                      onClick={handleClose}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                      Close
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
