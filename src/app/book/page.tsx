"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { TimeSlot, Service } from "@/types";

type BookingStep = "service-selection" | "date-time-selection" | "enter-details" | "success";

export default function BookPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<BookingStep>("service-selection");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    notes: "",
  });
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const services: Service[] = [
    {
      id: "first-session",
      title: "First Session",
      duration: 40,
      price: "₹299",
      description:
        "Your first 40-minute session — a gentle step to understand your needs and plan your path forward.",
      features: [
        "Understand your needs",
        "Plan your therapy journey",
        "No long-term commitment",
      ],
      popular: true,
    },
    {
      id: "regular-session",
      title: "Regular Session",
      duration: 60,
      price: "₹2,500",
      description:
        "Standard 60-minute therapy session for continued support and growth.",
      features: [
        "Personalized approach",
        "Confidential environment",
        "Follow-up resources",
      ],
    },
  ];

  useEffect(() => {
    if (user) {
      const pendingBooking = sessionStorage.getItem('pendingBooking');
      if (pendingBooking) {
        try {
          const data = JSON.parse(pendingBooking);
          setSelectedService(data.service);
          setSelectedSlot(data.slot);
          setSelectedDate(data.slot.date);
          setBookingForm({
            ...data.form,
            clientName: data.form.clientName || user.displayName || "",
            clientEmail: data.form.clientEmail || user.email || "",
          });
          setCurrentStep("enter-details");
        } catch (error) {
          console.error("Error restoring pending booking:", error);
        }
      } else if (bookingForm.clientName === "") {
        setBookingForm((prev) => ({
          ...prev,
          clientName: user.displayName || "",
          clientEmail: user.email || "",
        }));
      }
    }
  }, [user]);

  useEffect(() => {
    if (selectedService && selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedService, selectedDate]);

  const fetchAvailableSlots = async () => {
    if (!selectedService || !selectedDate) return;

    setLoadingSlots(true);
    try {
      const response = await fetch(
        `/api/slots?date=${selectedDate}&service=${selectedService.title}`
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

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setCurrentStep("date-time-selection");
  };

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setCurrentStep("enter-details");
  };

  const handleBackToServices = () => {
    setCurrentStep("service-selection");
    setSelectedService(null);
    setSelectedDate("");
    setSelectedSlot(null);
    setError("");
  };

  const handleBackToDateTime = () => {
    setCurrentStep("date-time-selection");
    setSelectedSlot(null);
    setError("");
  };

  const handleBooking = async () => {
    if (
      !selectedService ||
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
        service: selectedService,
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
          service: selectedService.title,
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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startDayOfWeek, year, month };
  };

  const isDateAvailable = (date: Date) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date >= tomorrow;
  };

  if (loading) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-b-2 border-moss mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Calendly-style Layout */}
      <div className="pt-24 pb-12 min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="max-w-6xl w-full mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
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
                  {selectedService && (
                    <>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedService.title}
                      </h2>
                      <div className="flex items-center text-gray-600 mb-4">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{selectedService.duration} min</span>
                      </div>
                      {selectedSlot && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-start mb-2">
                            <svg className="w-5 h-5 mr-2 text-gray-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {formatTimeRange(selectedSlot.time, selectedService.duration)}
                              </p>
                              <p className="text-sm text-gray-600">
                                {formatDate(selectedSlot.date)}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                
                {!selectedService && (
                  <p className="text-gray-600 text-sm">
                    Begin with Clarity. Your first session is only ₹299 — a gentle step to understand your needs and plan your path forward.
                  </p>
                )}
              </div>

              {/* Right Content Area */}
              <div className="p-8 lg:p-12">
                
                {/* Step 1: Service Selection */}
                {currentStep === "service-selection" && (
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                      Select a Service
                    </h1>
                    <div className="space-y-4">
                      {services.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => handleServiceSelect(service)}
                          className="w-full text-left p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-gray-900">
                              {service.title}
                            </h3>
                            {service.popular && (
                              <span className="text-xs bg-moss text-white px-2 py-1 rounded-full">
                                Most Popular
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-semibold text-lg text-moss mr-4">{service.price}</span>
                            <span>• {service.duration} minutes</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Date & Time Selection */}
                {currentStep === "date-time-selection" && selectedService && (
                  <div>
                    <button
                      onClick={handleBackToServices}
                      className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>
                    
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      Select a Date & Time
                    </h1>
                    <p className="text-gray-600 mb-8">
                      Choose an available time slot for your session
                    </p>

                    <div className="grid grid-cols-1 gap-8">
                      {/* Date Selector */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Select Date
                        </label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => {
                            setSelectedDate(e.target.value);
                          }}
                          min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                        />
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

                {/* Step 3: Enter Details */}
                {currentStep === "enter-details" && selectedSlot && selectedService && (
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

                {/* Step 4: Success */}
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
                        onClick={() => {
                          setCurrentStep("service-selection");
                          setSelectedService(null);
                          setSelectedDate("");
                          setSelectedSlot(null);
                          setBookingForm({ clientName: "", clientEmail: "", clientPhone: "", notes: "" });
                        }}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                      >
                        Book Another Session
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
