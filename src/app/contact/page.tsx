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
      <section className="pt-40 pb-16 bg-background relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-xs tracking-widest font-medium font-montserrat text-black/60 mb-4 uppercase">Reach Out</div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-charcoal mb-6 font-awesome-serif uppercase tracking-widest">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl font-awesome-serif uppercase tracking-wide text-charcoal/80">
              Ready to begin your journey? I'm here to help and answer any questions you may have.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl lg:text-4xl text-charcoal mb-8 font-awesome-serif uppercase tracking-wide">
                Send a Message
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-xs tracking-widest font-medium font-montserrat text-black/60 mb-2 uppercase"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald focus:border-transparent bg-background font-montserrat text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-xs tracking-widest font-medium font-montserrat text-black/60 mb-2 uppercase"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald focus:border-transparent bg-background font-montserrat text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs tracking-widest font-medium font-montserrat text-black/60 mb-2 uppercase"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald focus:border-transparent bg-background font-montserrat text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs tracking-widest font-medium font-montserrat text-black/60 mb-2 uppercase"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald focus:border-transparent bg-background font-montserrat text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block text-xs tracking-widest font-medium font-montserrat text-black/60 mb-2 uppercase"
                  >
                    Service Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald focus:border-transparent bg-background font-montserrat text-sm appearance-none"
                  >
                    <option value="">Select a service</option>
                    <option value="individual-therapy">Individual Therapy</option>
                    <option value="couples-therapy">Couples Therapy</option>
                    <option value="behavioural-coaching">Behavioural Coaching</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs tracking-widest font-medium font-montserrat text-black/60 mb-2 uppercase"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me a bit about what you're looking for or any questions you have..."
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald focus:border-transparent bg-background resize-none font-montserrat text-sm"
                  ></textarea>
                </div>

                <div className="flex items-start mt-2">
                  <input
                    id="privacy"
                    name="privacy"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-emerald focus:ring-emerald border-charcoal/20 rounded mt-1"
                  />
                  <label
                    htmlFor="privacy"
                    className="ml-3 block text-xs font-montserrat text-charcoal/70"
                  >
                    I agree to the{" "}
                    <Link
                      href="/privacy"
                      className="text-emerald hover:text-emerald/80 underline"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/terms"
                      className="text-emerald hover:text-emerald/80 underline"
                    >
                      Terms of Service
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  className="bg-charcoal text-white hover:bg-black transition-colors font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full w-full mt-4"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl lg:text-4xl text-charcoal mb-8 font-awesome-serif uppercase tracking-wide">
                Contact Information
              </h2>

              <div className="space-y-8 mb-12">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-charcoal/10">
                    <span className="text-xl opacity-70">📧</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-sm font-awesome-serif text-charcoal uppercase tracking-wider mb-2">
                      Email
                    </h3>
                    <p className="text-sm font-montserrat text-charcoal/80 font-medium pb-1">hello@mantrana.com</p>
                    <p className="text-sm font-montserrat text-charcoal/80 font-medium">info@mantrana.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-charcoal/10">
                    <span className="text-xl opacity-70">📱</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-sm font-awesome-serif text-charcoal uppercase tracking-wider mb-2">
                      Phone
                    </h3>
                    <p className="text-sm font-montserrat text-charcoal/80 font-medium pb-1">+91 8328438589</p>
                    <p className="text-xs font-montserrat tracking-widest uppercase text-charcoal/50 mt-1 font-semibold">
                      Mon-Fri, 9 AM - 6 PM IST
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-charcoal/10">
                    <span className="text-xl opacity-70">💬</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-sm font-awesome-serif text-charcoal uppercase tracking-wider mb-2">
                      WhatsApp
                    </h3>
                    <p className="text-sm font-montserrat text-charcoal/80 font-medium pb-1">+91 8328438589</p>
                    <Link
                      href="https://wa.me/918328438589"
                      className="text-xs font-montserrat tracking-widest uppercase text-emerald mt-1 font-semibold hover:text-emerald/80 inline-block"
                    >
                      Send Message →
                    </Link>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-charcoal/10">
                    <span className="text-xl opacity-70">📍</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-sm font-awesome-serif text-charcoal uppercase tracking-wider mb-2">
                      Location
                    </h3>
                    <p className="text-sm font-montserrat text-charcoal/80 font-medium pb-1">
                      Visakhapatnam, Andhra Pradesh
                    </p>
                    <p className="text-xs font-montserrat tracking-widest uppercase text-charcoal/50 mt-1 font-semibold">
                      Online sessions available worldwide
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-background rounded-[30px] p-8 lg:p-12 shadow-soft">
                <h3 className="text-2xl font-awesome-serif text-charcoal uppercase tracking-wider mb-8 text-center">
                  Quick Actions
                </h3>
                <div className="space-y-4">
                  <Link
                    href="/book"
                    className="bg-emerald hover:bg-emerald/90 text-white transition-colors font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full w-full text-center block"
                  >
                    Book a Session
                  </Link>
                  <Link
                    href="mailto:hello@mantrana.com"
                    className="bg-white hover:bg-gray-50 border border-charcoal/10 text-charcoal transition-colors font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full w-full text-center block"
                  >
                    Send Email
                  </Link>
                  <Link
                    href="https://wa.me/918328438589"
                    className="bg-white hover:bg-gray-50 border border-charcoal/10 text-charcoal transition-colors font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full w-full text-center block"
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
      <section className="py-16 md:py-24 bg-background">
        <div className="container-custom">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="text-xs tracking-widest font-medium font-montserrat text-black/60 mb-2 uppercase">FAQ</div>
            <h2 className="text-4xl lg:text-5xl text-charcoal mb-6 font-awesome-serif uppercase tracking-wide">
              Frequently Asked Questions
            </h2>
            <p className="text-sm md:text-base font-montserrat text-charcoal/80 font-medium leading-relaxed">
              It's natural to have questions before you start — here's where clarity begins.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
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
              <div key={index} className="bg-white rounded-[20px] p-8 shadow-soft border border-charcoal/5">
                <h3 className="text-xl font-awesome-serif text-charcoal mb-4 uppercase tracking-wider">
                  {faq.question}
                </h3>
                <p className="text-sm md:text-base font-montserrat text-charcoal/80 font-medium leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs tracking-widest font-medium font-montserrat text-black/60 mb-2 uppercase">Schedule</div>
              <h2 className="text-4xl lg:text-5xl text-charcoal mb-8 font-awesome-serif uppercase tracking-wide">
                Office Hours & Availability
              </h2>
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center py-4 border-b border-charcoal/10">
                  <span className="text-sm font-awesome-serif text-charcoal uppercase tracking-wider">
                    Monday - Friday
                  </span>
                  <span className="text-sm font-montserrat text-charcoal/80 font-medium">9:00 AM - 6:00 PM IST</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-charcoal/10">
                  <span className="text-sm font-awesome-serif text-charcoal uppercase tracking-wider">Saturday</span>
                  <span className="text-sm font-montserrat text-charcoal/80 font-medium">10:00 AM - 4:00 PM IST</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-charcoal/10">
                  <span className="text-sm font-awesome-serif text-charcoal uppercase tracking-wider">Sunday</span>
                  <span className="text-sm font-montserrat text-charcoal/80 font-medium">By appointment only</span>
                </div>
              </div>
              <div className="p-8 bg-background rounded-[20px] shadow-sm">
                <h3 className="text-lg font-awesome-serif text-charcoal uppercase tracking-wider mb-4">Response Times</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-emerald mr-3">•</span>
                    <span className="text-sm font-montserrat text-charcoal/80 font-medium">Email inquiries: Within 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald mr-3">•</span>
                    <span className="text-sm font-montserrat text-charcoal/80 font-medium">WhatsApp messages: Within 2-4 hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald mr-3">•</span>
                    <span className="text-sm font-montserrat text-charcoal/80 font-medium">Booking requests: Same day confirmation</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-emerald rounded-[30px] h-96 lg:h-[540px] shadow-soft flex items-center justify-center relative overflow-hidden">
              <img
                src="/images/diwali-backdrop-d.png"
                className="absolute -top-[30%] -left-[10%] w-[400px] opacity-[0.1] pointer-events-none select-none"
                alt="Decorative"
              />
              <img
                src="/images/diwali-backdrop.png"
                className="absolute -bottom-[30%] -right-[10%] w-[400px] opacity-[0.1] pointer-events-none select-none"
                alt="Decorative"
              />
              <div className="text-center text-white relative z-10 px-8">
                <div className="text-5xl mb-6">⏰</div>
                <h3 className="text-3xl font-awesome-serif uppercase tracking-wider mb-4">
                  Available for Support
                </h3>
                <p className="text-base font-montserrat uppercase tracking-widest text-white/80 font-semibold">
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
