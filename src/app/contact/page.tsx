import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Contact Mantrana | Get in Touch with Mohana Rupa",
  description:
    "Contact Mohana Rupa for therapy, counselling, and coaching services. Book a session, ask questions, or schedule a free consultation call.",
};

export default function ContactPage() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="pt-40 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Get in <span className="text-moss">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Ready to begin your journey? I'm here to help and answer any
              questions you may have.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Send a Message
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Service Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    <option value="individual-therapy">
                      Individual Therapy
                    </option>
                    <option value="life-coaching">Life Coaching</option>
                    <option value="group-workshops">Group Workshops</option>
                    <option value="specialized-programs">
                      Specialized Programs
                    </option>
                    <option value="consultation">Free Consultation</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me a bit about what you're looking for or any questions you have..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    id="privacy"
                    name="privacy"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-moss focus:ring-moss border-gray-300 rounded"
                  />
                  <label
                    htmlFor="privacy"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    I agree to the{" "}
                    <Link
                      href="/privacy"
                      className="text-moss hover:text-moss/80 underline"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/terms"
                      className="text-moss hover:text-moss/80 underline"
                    >
                      Terms of Service
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn-pill btn-primary w-full text-lg py-4"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Contact Information
              </h2>

              <div className="space-y-8 mb-12">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-moss/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-moss text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Email
                    </h3>
                    <p className="text-gray-600">hello@mantrana.com</p>
                    <p className="text-gray-600">info@mantrana.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-moss/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-moss text-xl">📱</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Phone
                    </h3>
                    <p className="text-gray-600">+91 8328438589</p>
                    <p className="text-sm text-gray-500">
                      Available Mon-Fri, 9 AM - 6 PM IST
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-moss/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-moss text-xl">💬</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      WhatsApp
                    </h3>
                    <p className="text-gray-600">+91 8328438589</p>
                    <Link
                      href="https://wa.me/918328438589"
                      className="text-moss hover:text-moss/80 text-sm"
                    >
                      Send WhatsApp Message →
                    </Link>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-moss/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-moss text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Location
                    </h3>
                    <p className="text-gray-600">
                      Visakhapatnam, Andhra Pradesh
                    </p>
                    <p className="text-sm text-gray-500">
                      Online sessions available worldwide
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-moss/20 rounded-3xl p-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">
                  Quick Actions
                </h3>
                <div className="space-y-4">
                  <Link
                    href="/book"
                    className="btn-pill btn-primary bg-moss hover:bg-teal w-full text-center block"
                  >
                    Book a Session
                  </Link>
                  <Link
                    href="mailto:hello@mantrana.com"
                    className="btn-pill btn-secondary text-black/70 w-full text-center block"
                  >
                    Send Email
                  </Link>
                  <Link
                    href="https://wa.me/918328438589"
                    className="btn-pill btn-secondary text-black/70 w-full text-center block"
                  >
                    WhatsApp Chat
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              It's natural to have questions before you start — here's where clarity begins.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                question: "What can I expect in the first session?",
                answer:
                  "Your first session is a space to talk — freely and without judgment. We begin by understanding what brings you here, what you're hoping to change, and how therapy can best support you.",
              },
              {
                question: "What makes your therapeutic approach unique?",
                answer:
                  "At Mantrana, therapy follows an eclectic approach that blends the most effective tools from behavioural science, cognitive restructuring, NLP, and hypnosis to create meaningful, lasting change. Each session is tailored to your needs — integrating science, sensitivity, and self-awareness to help you reconnect with balance and clarity.",
              },
              {
                question: "Are NLP and Hypnosis safe and evidence-based?",
                answer:
                  "Yes. When practiced by a trained therapist, NLP and Hypnosis are recognized tools to transform thought and behaviour patterns. Combined with Cognitive Restructuring, they provide effective pathways for change.",
              },
              {
                question: "Do I have to believe in hypnosis for it to work?",
                answer:
                  "No. Hypnosis is a relaxed, focused state — you remain aware and in control throughout. Openness helps, but belief is not required. We proceed only with your consent and comfort.",
              },
              {
                question: "Do you offer online sessions?",
                answer:
                  "Yes. Mantrana Therapy offers both online and offline sessions, ensuring you can access support in the way that feels most convenient and comfortable for you. Online sessions are conducted through secure, confidential platforms.",
              },
              {
                question: "How long does therapy take?",
                answer:
                  "It depends on the depth of the issues and the goals you want to achieve. Some clients notice shifts in 4–8 sessions, while others prefer ongoing support. We decide together after assessing your needs. The duration of each session is 60 minutes.",
              },
              {
                question: "How much does therapy cost?",
                answer:
                  "The first 40-minute session costs just ₹299 — a space to understand what brings you here and plan your therapy journey. After that, pricing varies based on the depth of the issue and the mode of therapy. Online sessions are slightly lower, while in-person sessions may differ to include space and resource costs.",
              },
              {
                question: "Is therapy only for people in distress?",
                answer:
                  "Not at all. Therapy isn't just about coping — it's also about growing. Many clients seek therapy to improve focus, emotional balance, communication, or self-awareness. It's a space to understand yourself better and live with greater clarity and ease.",
              },
              {
                question: "What kinds of concerns do you work with?",
                answer:
                  "I work with a wide range of behavioural challenges — including compulsive tech use, digital habits and addictions, overthinking, stress, self-esteem issues, relationship issues, emotional regulation, burnout, sleep problems, weight management, life stage transitions to name a few.",
              },
              {
                question: "What if I've never tried therapy before?",
                answer:
                  "That's completely okay. You don't need to prepare or have the 'right' words. All you need to do is show up as you are. My role is to guide you through the process gently — helping you feel comfortable, seen, and supported.",
              },
              {
                question: "How is your approach different from traditional talk therapy?",
                answer:
                  "Traditional therapy often focuses on exploring the past and unpacking emotions. My approach is solution-focused and action-oriented, helping you shift patterns and move forward effectively.",
              },
              {
                question: "How do I know if therapy with you is right for me?",
                answer:
                  "If you feel stuck, overwhelmed, or repeatedly trying to change something internally — and haven't yet found clarity - therapy with me may be helpful. You can also start with one session to see if it feels like the right fit.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-soft">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                Office Hours & Availability
              </h2>
              <div className="space-y-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">
                    Monday - Friday
                  </span>
                  <span className="text-gray-600">9:00 AM - 6:00 PM IST</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Saturday</span>
                  <span className="text-gray-600">10:00 AM - 4:00 PM IST</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Sunday</span>
                  <span className="text-gray-600">By appointment only</span>
                </div>
              </div>
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-2">Response Times</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Email inquiries: Within 24 hours</li>
                  <li>• WhatsApp messages: Within 2-4 hours</li>
                  <li>• Booking requests: Same day confirmation</li>
                </ul>
              </div>
            </div>
            <div className="bg-moss/20 rounded-3xl h-96 lg:h-[540px] shadow-soft flex items-center justify-center">
              <div className="text-center text-moss">
                <div className="text-4xl mb-4">⏰</div>
                <h3 className="text-2xl font-bold mb-2">
                  Available for Support
                </h3>
                <p className="text-black/50">
                  Ready to help you on your journey
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
