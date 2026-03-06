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
      <section className="pt-40 py-16 bg-background relative overflow-hidden">
        <div className="container-custom text-center relative z-10">
          <div className="text-xs tracking-widest font-medium font-montserrat text-black/60 mb-4 uppercase">Let's Connect</div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl text-charcoal mb-6 font-awesome-serif uppercase tracking-widest">
            Book Your Session
          </h1>
          <p className="text-sm md:text-base font-montserrat text-charcoal/80 font-medium leading-relaxed max-w-3xl mx-auto mb-4">
            Begin with Clarity. Your first 30-minute session is only ₹299/— a
            gentle step to understand your needs and plan your path forward.
          </p>
          <p className="text-xs font-montserrat tracking-widest uppercase text-charcoal/50 mt-1 font-semibold">
            Sessions available from 10:00 AM to 7:00 PM
          </p>
        </div>
      </section>

      {bookingSuccess && (
        <section className="py-16 bg-white border-y border-charcoal/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-background rounded-[30px] shadow-soft p-12 text-center border border-charcoal/5">
              <div className="text-emerald text-6xl mb-6">✅</div>
              <h2 className="text-3xl font-awesome-serif text-charcoal mb-4 uppercase tracking-wide">
                Booking Confirmed!
              </h2>
              <p className="text-sm font-montserrat text-charcoal/70 font-medium mb-8">
                Your appointment has been successfully booked. You will receive
                a confirmation email shortly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push("/account")}
                  className="bg-emerald text-white hover:bg-emerald/90 transition-colors font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full"
                >
                  View Appointments
                </button>
                <button
                  onClick={() => setBookingSuccess(false)}
                  className="bg-white text-charcoal hover:bg-gray-50 border border-charcoal/10 transition-colors font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full"
                >
                  Book Another
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {!bookingSuccess && (
        <>
          {/* Services Selection */}
          <section className="py-16 md:py-24 bg-white">
            <div className="container-custom">
              <div className="text-center mb-16 max-w-3xl mx-auto">
                <div className="text-xs tracking-widest font-medium font-montserrat text-black/60 mb-2 uppercase">Pricing</div>
                <h2 className="text-4xl lg:text-5xl text-charcoal mb-6 font-awesome-serif uppercase tracking-wide">
                  Choose Your Service
                </h2>
                <p className="text-sm md:text-base font-montserrat text-charcoal/80 font-medium leading-relaxed">
                  Select the service that best fits your needs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`bg-white rounded-[30px] shadow-soft p-8 text-center border-2 transition-all flex flex-col ${service.popular ? "border-emerald relative" : "border-charcoal/5 hover:border-charcoal/10"
                      }`}
                  >
                    {service.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-emerald text-white text-[10px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full">
                        Start Here
                      </div>
                    )}

                    <h3 className="text-2xl font-awesome-serif text-charcoal mb-2 uppercase tracking-wide">
                      {service.title}
                    </h3>
                    <div className="mb-6">
                      <span className="text-4xl font-awesome-serif text-emerald">
                        {service.price}
                      </span>
                      <div className="text-xs font-montserrat tracking-widest uppercase text-charcoal/50 mt-2 font-semibold">
                        {service.duration} minutes
                      </div>
                    </div>

                    <p className="text-sm font-montserrat text-charcoal/70 font-medium mb-8 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="text-left text-sm font-montserrat text-charcoal/70 space-y-3 mb-8 flex-1">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-emerald mr-3 mt-0.5">•</span>
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleServiceClick(service)}
                      className="bg-charcoal text-white hover:bg-black transition-colors font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full w-full mt-auto"
                    >
                      Schedule
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
