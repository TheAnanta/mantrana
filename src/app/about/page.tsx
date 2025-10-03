import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title:
    "About Mantrana | Mohana Rupa Nekkanti - Psychotherapist & Behavioral Specialist",
  description:
    "Learn about Mohana Rupa Nekkanti's journey from engineering to psychology, her Ph.D. in Applied Psychology, and the philosophy behind Mantrana therapy practice.",
};

export default function AboutPage() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-lavender via-white to-azure">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              About <span className="text-moss">Mantrana</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Psychotherapist &amp; Behavioral Specialist
              <br />
              Thriving in Balance 🌸
            </p>
          </div>
        </div>
      </section>

      {/* Personal Journey Section */}
      <section className="section-padding bg-white" id="about-me">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="bg-gradient-to-br from-azure to-lavender rounded-3xl h-96 lg:h-128 shadow-soft">
              <img
                src="/images/mohana_rupa.png"
                alt="Mohana Rupa Nekkanti"
                className="object-cover w-full h-full rounded-3xl object-[20%]"
              />
            </div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                Meet Mohana Rupa Nekkanti
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Namaste! I am Mohana Rupa Nekkanti, founder of Mantrana therapy. I am a Psychotherapist and Behavioural Specialist with a Ph.D. in Applied Psychology and advanced certifications in Clinical Hypnosis and Neuro-Linguistic Programming.
                </p>
                <p>
                  As a Behavioral Specialist, I help individuals reshape unhelpful patterns—whether it's digital habits, stress responses, or relationship dynamics—so they can live with greater balance and clarity.
                </p>
                <Link href="#my-story" className="btn-pill btn-primary inline-block">
                  Read My Story
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-16" id="my-story">
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed max-w-4xl">
              <p>
                My journey started in engineering, where my love for
                problem-solving grew. But it was my curiosity about the human
                mind—how our thoughts, emotions, and behaviours shape our
                lives—that led me to Psychology. This path allows me to
                combine insight, research, and compassion to truly make a
                difference.
              </p>
              <p>
                Having faced my own struggles with overthinking and navigating
                life quietly, I understand how hard it can be to reach out for
                support. That's why I created Mantrana, my therapy practice—a
                welcoming, safe space where individuals can explore their
                challenges, gain clarity, and build strength.
              </p>
              <p>
                With nearly ten years of teaching experience and over five years
                of research in Applied Psychology, I've worked closely with young
                adults and recognize the need for compassionate, non-judgmental
                support. My approach blends evidence-based techniques like Neuro
                Linguistic Programming, Clinical Hypnosis, and Cognitive
                restructuring with an inclination towards blending wisdom from
                Bharateeya Knowledge Systems and Indian philosophy.
              </p>
              <p>
                When I'm not working, I love reading, traveling, watching films,
                and exploring new ideas—activities that inspire me and enrich my
                connection with those I work with.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-gray-50" id="about-mantrana">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About Mantrana Therapy
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              The name Mantrana is derived from Sanskrit, meaning{" "}
              <strong>counsel, guidance, or thoughtful conversation</strong>. It
              perfectly captures the essence of therapy as I see it—not about
              giving advice or ready-made solutions, but walking alongside you
              as you uncover your own clarity and direction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-soft text-center">
              <div className="w-16 h-16 bg-moss/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-moss">💭</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Safe Space
              </h3>
              <p className="text-gray-600 leading-relaxed">
                A dedicated space to pause, reflect, and realign. Here, you
                won't be told what to do; instead, you will be gently guided to
                discover how you want to live.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-soft text-center">
              <div className="w-16 h-16 bg-moss/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-moss">🧘</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Integrated Approach
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Blending evidence-based techniques such as NLP, Hypnosis, and
                Cognitive Restructuring with timeless insights inspired by
                Indian wisdom traditions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-soft text-center">
              <div className="w-16 h-16 bg-moss/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-moss">⚖️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Creating Balance
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Each session creates balance—between reflection and action,
                challenges and strengths, inner struggles and new possibilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                Qualifications & Experience
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-moss pl-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Education & Certifications
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Ph.D. in Applied Psychology</li>
                    <li>• Master Practitioner in Neuro Linguistic Programming</li>
                    <li>• Master Practitioner in Cognitive Hypnotic Psychotherapy</li>
                    <li>• Published research papers in internationally recognized, peer-reviewed journals (Scopus-indexed) and presented at academic conferences</li>
                  </ul>
                </div>

                <div className="border-l-4 border-amaranth pl-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Professional Experience
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Nearly 10 years of teaching experience</li>
                    <li>• Over 5 years of research in Applied Psychology</li>
                    <li>• Specialized work with young adults</li>
                    <li>• Founder of Mantrana therapy practice</li>
                    <li>• One month On Site Substance Use Treatment Orientation Program (STOP) at Centre for Addiction Medicine (CAM), NIMHANS, Bengaluru</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                Specialized Areas
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-6">
                <p>
                  As a Behavioural Specialist, I work with individuals to understand and transform patterns of thought and action that may be holding them back. Many behaviors can be reshaped with the right guidance. Some areas I focus on include:
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-2">
                    Digital and Social Media Habits
                  </h3>
                  <p className="text-gray-600">
                    Reducing screen time, managing online distractions, and building healthier tech use.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-2">
                    Stress and Anxiety Responses
                  </h3>
                  <p className="text-gray-600">
                    Learning new ways to cope with challenges and pressure.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-2">
                    Unhelpful Thinking Patterns
                  </h3>
                  <p className="text-gray-600">
                    Breaking cycles of overthinking, procrastination, or negative self-talk.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-2">
                    Relationship and Communication Habits
                  </h3>
                  <p className="text-gray-600">
                    Improving how you connect, respond, and express yourself.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-2">
                    Lifestyle Choices
                  </h3>
                  <p className="text-gray-600">
                    Cultivating routines that support balance, well-being, and resilience.
                  </p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mt-6">
                These are just examples—any behaviour that creates distress, imbalance, or limits growth can be explored and modified in therapy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gradient-to-r from-moss to-citron">
        <div className="container-custom text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
            Why Mantrana?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Because a meaningful conversation can change the way you see
            yourself, your challenges, and your path forward.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Non-Judgmental",
                description:
                  "A safe, accepting space where you can explore challenges without fear of judgment",
              },
              {
                title: "Evidence-Based",
                description:
                  "Techniques grounded in research and proven effectiveness",
              },
              {
                title: "Compassionate",
                description:
                  "Every interaction rooted in understanding and genuine care",
              },
              {
                title: "Transformative",
                description:
                  "Not just conversation, but a space for meaningful change",
              },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-white/90 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Take the first step towards healing and personal growth. I'm here to
            support you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/book"
              className="btn-pill btn-primary text-lg px-10 py-5"
            >
              Book a Session
            </Link>
            <Link
              href="/contact"
              className="btn-pill btn-secondary text-lg px-10 py-5"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
