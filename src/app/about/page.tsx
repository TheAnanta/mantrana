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
      <section className="pt-40 pb-16 bg-background relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-xs tracking-widest font-medium font-montserrat text-black/60 mb-4 uppercase">Our Story</div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-charcoal mb-6 font-awesome-serif uppercase tracking-widest">
              About <span className="text-emerald">Mantrana</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Personal Journey Section */}
      <section className="py-16 md:py-24 bg-white" id="about-me">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="bg-teal/10 rounded-[30px] h-96 lg:h-[32rem] shadow-soft overflow-hidden">
              <img
                src="/images/mohana_rupa.png"
                alt="Mohana Rupa Nekkanti"
                className="object-cover w-full h-full object-[20%]"
              />
            </div>
            <div>
              <div className="text-xs tracking-widest font-medium font-montserrat text-black/60 mb-2 uppercase">The Founder</div>
              <h2 className="text-4xl lg:text-5xl text-charcoal mb-8 font-awesome-serif uppercase tracking-wide">
                Meet Dr. Mohana Rupa Nekkanti
              </h2>
              <div className="space-y-6 text-sm md:text-base font-montserrat text-charcoal/80 leading-relaxed font-medium">
                <p>
                  Namaste!
                  <br />I am Dr. Mohana Rupa Nekkanti, founder of Mantrana therapy.
                  I am a Psychotherapist and Behavioural Specialist with a Ph.D.
                  in Applied Psychology and advanced certifications in Clinical
                  Hypnosis and Neuro-Linguistic Programming.
                </p>
                <p>
                  As a Behavioral Specialist, I help individuals reshape
                  unhelpful patterns—whether it's digital habits, stress
                  responses, or relationship dynamics—so they can live with
                  greater balance and clarity.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16" id="my-story">
            <div className="space-y-6 text-sm md:text-base font-montserrat text-charcoal/80 leading-relaxed font-medium max-w-4xl">
              <p>
                My journey started in engineering, where my love for
                problem-solving grew. But it was my curiosity about the human
                mind—how our thoughts, emotions, and behaviours shape our
                lives—that led me to Psychology. This path allows me to combine
                insight, research, and compassion to truly make a difference.
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
                of research in Applied Psychology, I've worked closely with
                young adults and recognize the need for compassionate,
                non-judgmental support. My approach blends evidence-based
                techniques like Neuro Linguistic Programming, Clinical Hypnosis,
                and Cognitive restructuring with an inclination towards blending
                wisdom from Bharateeya Knowledge Systems and Indian philosophy.
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
      <section className="py-16 md:py-24 bg-background" id="about-mantrana">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="text-xs tracking-widest font-medium font-montserrat text-black/60 mb-2 uppercase">The Philosophy</div>
            <h2 className="text-4xl lg:text-5xl text-charcoal mb-6 font-awesome-serif uppercase tracking-wide">
              About Mantrana Therapy
            </h2>
            <p className="text-sm md:text-base text-charcoal/80 leading-relaxed font-montserrat font-medium mb-8">
              The name Mantrana is derived from Sanskrit, meaning{" "}
              <strong>counsel, guidance, or thoughtful conversation</strong>. It
              perfectly captures the essence of therapy as I see it—not about
              giving advice or ready-made solutions, but walking alongside you
              as you uncover your own clarity and direction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-[30px] p-8 lg:p-12 shadow-soft hover:shadow-medium transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-teal">💭</span>
              </div>
              <h3 className="text-xl font-awesome-serif text-charcoal uppercase tracking-wider mb-4">
                Safe Space
              </h3>
              <p className="text-charcoal/80 leading-relaxed font-montserrat text-sm font-medium">
                A dedicated space to pause, reflect, and realign. Here, you
                won't be told what to do; instead, you will be gently guided to
                discover how you want to live.
              </p>
            </div>

            <div className="bg-white rounded-[30px] p-8 lg:p-12 shadow-soft hover:shadow-medium transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-emerald/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-emerald">🧘</span>
              </div>
              <h3 className="text-xl font-awesome-serif text-charcoal uppercase tracking-wider mb-4">
                Integrated Approach
              </h3>
              <p className="text-charcoal/80 leading-relaxed font-montserrat text-sm font-medium">
                Blending evidence-based techniques such as NLP, Hypnosis, and
                Cognitive Restructuring with timeless insights inspired by
                Indian wisdom traditions.
              </p>
            </div>

            <div className="bg-white rounded-[30px] p-8 lg:p-12 shadow-soft hover:shadow-medium transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-terracotta">⚖️</span>
              </div>
              <h3 className="text-xl font-awesome-serif text-charcoal uppercase tracking-wider mb-4">
                Creating Balance
              </h3>
              <p className="text-charcoal/80 leading-relaxed font-montserrat text-sm font-medium">
                Each session creates balance—between reflection and action,
                challenges and strengths, inner struggles and new possibilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="text-xs tracking-widest font-medium font-montserrat text-black/60 mb-2 uppercase">Background</div>
              <h2 className="text-4xl lg:text-5xl text-charcoal mb-8 font-awesome-serif uppercase tracking-wide">
                Qualifications & Experience
              </h2>
              <div className="space-y-8">
                <div className="border-l-[3px] border-emerald pl-6">
                  <h3 className="text-lg font-awesome-serif text-charcoal mb-3 uppercase tracking-wider">
                    Education & Certifications
                  </h3>
                  <ul className="space-y-3 text-sm md:text-base font-montserrat text-charcoal/80 font-medium">
                    <li>• Ph.D. in Applied Psychology</li>
                    <li>
                      • Master Practitioner in Neuro Linguistic Programming
                    </li>
                    <li>
                      • Master Practitioner in Cognitive Hypnotic Psychotherapy
                    </li>
                    <li>
                      • Published research papers in internationally recognized,
                      peer-reviewed journals (Scopus-indexed) and presented at
                      academic conferences
                    </li>
                  </ul>
                </div>

                <div className="border-l-[3px] border-terracotta pl-6">
                  <h3 className="text-lg font-awesome-serif text-charcoal mb-3 uppercase tracking-wider">
                    Professional Experience
                  </h3>
                  <ul className="space-y-3 text-sm md:text-base font-montserrat text-charcoal/80 font-medium">
                    <li>• Nearly 10 years of teaching experience</li>
                    <li>• Over 5 years of research in Applied Psychology</li>
                    <li>• Specialized work with young adults</li>
                    <li>• Founder of Mantrana therapy practice</li>
                    <li>
                      • One month On Site Substance Use Treatment Orientation
                      Program (STOP) at Centre for Addiction Medicine (CAM),
                      NIMHANS, Bengaluru
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs tracking-widest font-medium font-montserrat text-black/60 mb-2 uppercase">Expertise</div>
              <h2 className="text-4xl lg:text-5xl text-charcoal mb-8 font-awesome-serif uppercase tracking-wide">
                Specialized Areas
              </h2>
              <div className="space-y-6 text-sm md:text-base font-montserrat text-charcoal/80 font-medium leading-relaxed mb-8">
                <p>
                  As a Behavioural Specialist, I work with individuals to
                  understand and transform patterns of thought and action that
                  may be holding them back. Many behaviors can be reshaped with
                  the right guidance. Some areas I focus on include:
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-background rounded-2xl p-6 border border-black/5">
                  <h3 className="font-awesome-serif text-charcoal mb-2 uppercase tracking-wide">
                    Digital and Social Media Habits
                  </h3>
                  <p className="text-charcoal/80 font-montserrat text-sm font-medium">
                    Reducing screen time, managing online distractions, and
                    building healthier tech use.
                  </p>
                </div>
                <div className="bg-background rounded-2xl p-6 border border-black/5">
                  <h3 className="font-awesome-serif text-charcoal mb-2 uppercase tracking-wide">
                    Stress and Anxiety Responses
                  </h3>
                  <p className="text-charcoal/80 font-montserrat text-sm font-medium">
                    Learning new ways to cope with challenges and pressure.
                  </p>
                </div>
                <div className="bg-background rounded-2xl p-6 border border-black/5">
                  <h3 className="font-awesome-serif text-charcoal mb-2 uppercase tracking-wide">
                    Unhelpful Thinking Patterns
                  </h3>
                  <p className="text-charcoal/80 font-montserrat text-sm font-medium">
                    Breaking cycles of overthinking, procrastination, or
                    negative self-talk.
                  </p>
                </div>
                <div className="bg-background rounded-2xl p-6 border border-black/5">
                  <h3 className="font-awesome-serif text-charcoal mb-2 uppercase tracking-wide">
                    Relationship and Communication Habits
                  </h3>
                  <p className="text-charcoal/80 font-montserrat text-sm font-medium">
                    Improving how you connect, respond, and express yourself.
                  </p>
                </div>
                <div className="bg-background rounded-2xl p-6 border border-black/5">
                  <h3 className="font-awesome-serif text-charcoal mb-2 uppercase tracking-wide">
                    Lifestyle Choices
                  </h3>
                  <p className="text-charcoal/80 font-montserrat text-sm font-medium">
                    Cultivating routines that support balance, well-being, and
                    resilience.
                  </p>
                </div>
              </div>
              <p className="text-charcoal/80 font-montserrat text-sm font-medium leading-relaxed mt-8">
                These are just examples—any behaviour that creates distress,
                imbalance, or limits growth can be explored and modified in
                therapy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-emerald text-white">
        <div className="container-custom text-center">
          <div className="text-xs tracking-widest font-medium font-montserrat text-white/50 mb-2 uppercase">Core Values</div>
          <h2 className="text-4xl lg:text-5xl font-awesome-serif text-white mb-8 uppercase tracking-wide">
            Why Mantrana?
          </h2>
          <p className="text-sm md:text-base font-montserrat uppercase tracking-wider text-white/80 max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
            Because a meaningful conversation can change the way you see
            yourself, your challenges, and your path forward.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
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
              <div key={index} className="text-center group">
                <div className="h-0.5 w-12 bg-white/20 mx-auto mb-6 group-hover:w-24 group-hover:bg-white transition-all duration-300"></div>
                <h3 className="text-lg font-awesome-serif text-white mb-4 uppercase tracking-wider">
                  {value.title}
                </h3>
                <p className="text-white/70 font-montserrat text-sm leading-relaxed font-medium">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-24 md:py-32 relative overflow-hidden">
        <img
          src="/images/diwali-backdrop-d.png"
          className="absolute -top-[30%] -left-[10%] w-[600px] opacity-[0.15] pointer-events-none select-none"
          alt="Decorative"
        />
        <img
          src="/images/diwali-backdrop.png"
          className="absolute -bottom-[30%] -right-[10%] w-[600px] opacity-[0.15] pointer-events-none select-none"
          alt="Decorative"
        />
        <div className="container-custom text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl lg:text-7xl font-awesome-serif text-white mb-8 uppercase tracking-wide leading-tight">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-base md:text-lg font-montserrat uppercase tracking-wider text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
              Take the first step towards healing and personal growth. I'm here to
              support you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/book"
                className="bg-white hover:bg-gray-100 text-charcoal transition-colors font-semibold text-sm uppercase tracking-widest px-12 py-5 rounded-full"
              >
                Book a Session
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white/50 hover:border-white text-white transition-colors font-semibold text-sm uppercase tracking-widest px-12 py-5 rounded-full"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
