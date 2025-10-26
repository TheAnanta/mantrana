"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingDialog from "@/components/BookingDialog";
import Link from "next/link";
import { Service } from "@/types";

export default function BookPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedService(null);
  };

  const services: Service[] = [
    {
      id: "first-session",
      title: "First Session",
      duration: 30,
      price: "₹299",
      description:
        "Your first 30-minute session — a gentle step to understand your needs and plan your path forward.",
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
      price: "",
      description:
        "Standard 60-minute therapy session for continued support and growth.",
      features: [
        "Personalized approach",
        "Confidential environment",
        "Follow-up resources",
      ],
      disabled: true,
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
            Begin with Clarity. Your first 30-minute session is only ₹299/— a
            gentle step to understand your needs and plan your path forward.
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`bg-white rounded-2xl shadow-soft p-8 text-center border-2 transition-all ${
                      service.popular ? "ring-2 ring-moss ring-opacity-50" : ""
                    } ${service.disabled ? "opacity-75" : ""} border-transparent hover:border-gray-200`}
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
                      {service.price ? (
                        <>
                          <span className="text-3xl font-bold text-moss">
                            {service.price}
                          </span>
                          <div className="text-gray-500 mt-1">
                            {service.duration} minutes
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="text-lg font-medium text-gray-500">
                            Contact for pricing
                          </span>
                          <div className="text-gray-500 mt-1">
                            {service.duration} minutes
                          </div>
                        </>
                      )}
                    </div>

                    <p className="text-gray-600 mb-6">{service.description}</p>

                    <ul className="text-left text-sm text-gray-600 space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="text-moss mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => !service.disabled && handleServiceClick(service)}
                      disabled={service.disabled}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                        service.disabled
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {service.disabled ? "Currently Unavailable" : "Schedule"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Packages Section
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
          </section> */}
        </>
      )}

      {/* Booking Dialog */}
      {selectedService && (
        <BookingDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          service={selectedService}
        />
      )}

      <Footer />
    </main>
  );
}
