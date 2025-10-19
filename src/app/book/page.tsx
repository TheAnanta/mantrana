"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { TimeSlot, Service } from "@/types";

export default function BookPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
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
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState("");

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
    // {
    //   id: "consultation-call",
    //   title: "Consultation Call",
    //   duration: 15,
    //   price: "Free",
    //   description: "Discovery call to discuss your needs and answer questions.",
    //   features: ["No commitment", "Ask questions", "Learn about services"],
    //   popular: true,
    // },
  ];

  const packages = [
    {
      name: "3-Session Package",
      price: "₹6,750",
      originalPrice: "₹7,500",
      sessions: "3 sessions",
      savings: "10% discount",
      description: "Perfect for focused work on specific goals",
    },
    {
      name: "5-Session Package",
      price: "₹10,000",
      originalPrice: "₹12,500",
      sessions: "5 sessions",
      savings: "20% discount",
      description: "Ideal for comprehensive personal development",
      popular: true,
    },
    {
      name: "10-Session Package",
      price: "₹18,000",
      originalPrice: "₹25,000",
      sessions: "10 sessions",
      savings: "28% discount",
      description: "Best value for long-term transformation",
    },
  ];

  useEffect(() => {
    if (user && bookingForm.clientName === "") {
      setBookingForm((prev) => ({
        ...prev,
        clientName: user.displayName || "",
        clientEmail: user.email || "",
      }));
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

  const handleBooking = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

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
        setBookingSuccess(true);
        // Reset form
        setSelectedService(null);
        setSelectedDate("");
        setSelectedSlot(null);
        setBookingForm({
          clientName: user.displayName || "",
          clientEmail: user.email || "",
          clientPhone: "",
          notes: "",
        });
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

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
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
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-40 py-16 bg-moss/30 text-moss">
        <div className="container-custom text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Book Your Session
          </h1>
          <p className="text-xl lg:text-2xl text-black/60 max-w-3xl mx-auto leading-relaxed">
            Begin with Clarity. Your first 40-minute session is only ₹299/— 
            a gentle step to understand your needs and plan your path forward.
          </p>
          <p className="text-lg text-black/50 mt-4">
            Sessions available from 10:00 AM to 7:00 PM
          </p>
        </div>
      </section>

      {bookingSuccess && (
        <section className="py-8 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-soft p-8 text-center">
              <div className="text-green-500 text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Booking Confirmed!
              </h2>
              <p className="text-gray-600 mb-6">
                Your appointment has been successfully booked. You will receive
                a confirmation email shortly.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => router.push("/account")}
                  className="bg-moss text-white px-6 py-2 rounded-lg hover:bg-moss/90 transition-colors"
                >
                  View My Appointments
                </button>
                <button
                  onClick={() => setBookingSuccess(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Book Another Session
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {!bookingSuccess && (
        <>
          {/* Services Selection */}
          <section className="section-padding">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Choose Your Service
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Select the service that best fits your needs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`bg-white rounded-2xl shadow-soft p-8 text-center border-2 transition-all cursor-pointer ${
                      selectedService?.id === service.id
                        ? "border-moss bg-moss/5"
                        : "border-transparent hover:border-gray-200"
                    } ${
                      service.popular ? "ring-2 ring-moss ring-opacity-50" : ""
                    }`}
                    onClick={() => setSelectedService(service)}
                  >
                    {service.popular && (
                      <div className="inline-block bg-moss text-white text-sm px-3 py-1 rounded-full mb-4">
                        Start Here
                      </div>
                    )}

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-moss">
                        {service.price}
                      </span>
                      <div className="text-gray-500 mt-1">
                        {service.duration} minutes
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6">{service.description}</p>

                    <ul className="text-left text-sm text-gray-600 space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="text-moss mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Date and Time Selection */}
          {selectedService && (
            <section className="section-padding bg-gray-50">
              <div className="container-custom">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Select Date & Time
                  </h2>
                  <p className="text-gray-600">
                    Choose your preferred date and available time slot
                  </p>
                </div>

                <div className="max-w-4xl mx-auto">
                  <div className="bg-white rounded-2xl shadow-soft p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Date Selection */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          Select Date
                        </h3>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => {
                            setSelectedDate(e.target.value);
                            setSelectedSlot(null);
                          }}
                          min={getMinDate()}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-moss focus:border-transparent"
                        />
                      </div>

                      {/* Time Slots */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          Available Times
                        </h3>
                        {selectedDate ? (
                          loadingSlots ? (
                            <div className="text-center py-8">
                              <div className="animate-spin h-6 w-6 border-b-2 border-moss mx-auto mb-2"></div>
                              <p className="text-gray-600">
                                Loading available slots...
                              </p>
                            </div>
                          ) : availableSlots.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                              {availableSlots.map((slot, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setSelectedSlot(slot)}
                                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                                    selectedSlot?.time === slot.time
                                      ? "bg-moss text-white"
                                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                  }`}
                                >
                                  {formatTime(slot.time)}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-gray-500">
                              No available slots for this date
                            </div>
                          )
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            Please select a date first
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Booking Form */}
          {selectedService && selectedSlot && (
            <section className="section-padding">
              <div className="container-custom">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Complete Your Booking
                  </h2>
                  <p className="text-gray-600">
                    Please provide your details to confirm the appointment
                  </p>
                </div>

                <div className="max-w-2xl mx-auto">
                  <div className="bg-white rounded-2xl shadow-soft p-8">
                    {/* Booking Summary */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-8">
                      <h3 className="font-semibold text-gray-900 mb-4">
                        Booking Summary
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Service:</span>
                          <span className="font-medium">
                            {selectedService.title}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">
                            {new Date(selectedSlot.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time:</span>
                          <span className="font-medium">
                            {formatTime(selectedSlot.time)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">
                            {selectedService.duration} minutes
                          </span>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-semibold text-moss">
                            {selectedService.price}
                          </span>
                        </div>
                      </div>
                    </div>

                    {!user && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <p className="text-blue-800 text-sm">
                          Please{" "}
                          <Link href="/login" className="underline font-medium">
                            sign in
                          </Link>{" "}
                          to complete your booking.
                        </p>
                      </div>
                    )}

                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-800 text-sm">{error}</p>
                      </div>
                    )}

                    {/* Booking Form */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-moss focus:border-transparent"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-moss focus:border-transparent"
                          placeholder="Enter your email address"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-moss focus:border-transparent"
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Notes (Optional)
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-moss focus:border-transparent"
                          placeholder="Any specific topics you'd like to discuss or questions you have..."
                        ></textarea>
                      </div>

                      <button
                        onClick={handleBooking}
                        disabled={!user || isBooking}
                        className="w-full bg-moss text-white py-4 rounded-lg font-semibold hover:bg-moss/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isBooking ? (
                          <div className="flex items-center justify-center">
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
                            Booking...
                          </div>
                        ) : (
                          `Confirm Booking - ${selectedService.price}`
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Packages Section */}
          <section className="section-padding bg-gray-50">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Session Packages
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Save more with our session packages designed for your journey
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {packages.map((pkg, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-2xl shadow-soft p-8 text-center ${
                      pkg.popular
                        ? "ring-2 ring-moss ring-opacity-50 relative"
                        : ""
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-moss text-white text-sm px-4 py-2 rounded-full font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {pkg.name}
                      </h3>
                      <div className="mb-2">
                        <span className="text-3xl font-bold text-moss">
                          {pkg.price}
                        </span>
                        <span className="text-lg text-gray-400 line-through ml-2">
                          {pkg.originalPrice}
                        </span>
                      </div>
                      <div className="text-green-600 font-medium">
                        {pkg.savings}
                      </div>
                      <div className="text-gray-500 mt-1">{pkg.sessions}</div>
                    </div>

                    <p className="text-gray-600 mb-6 text-center">
                      {pkg.description}
                    </p>

                    <button
                      className={`btn-pill w-full text-center ${
                        pkg.popular
                          ? "btn-primary bg-moss"
                          : "btn-secondary bg-moss/10 text-moss hover:bg-moss/20"
                      }`}
                    >
                      Choose {pkg.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </main>
  );
}
