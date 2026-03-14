import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

// Hero Section Component
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-background pt-20 overflow-hidden">
      {/* Top Right Decorative Mandala */}
      <img
        src="/images/mantrana_top.png"
        className="absolute top-24 right-0 w-[150px] md:w-[200px] lg:w-[300px] pointer-events-none select-none z-0"
        alt="Decorative Mandala"
      />

      {/* Bottom Left Decorative Mandala */}
      <img
        src="/images/mandala_bottom.png"
        className="absolute bottom-0 left-0 w-[150px] md:w-[200px] lg:w-[300px] pointer-events-none select-none z-0"
        alt="Decorative Mandala"
      />

      <div className="relative container-custom text-center z-10 w-full">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <div className="mb-10 md:mb-14 mt-4 relative z-10 w-full flex justify-center">
            <img src="/images/mantrana-headlock.svg" alt="Mantrana" className="h-20 md:h-28 lg:h-36 w-auto object-contain" />
          </div>

          <div className="flex items-center justify-center w-full max-w-2xl mx-auto mb-10 md:mb-12">
            <div className="flex-1 h-[1px] bg-charcoal"></div>
            <p className="px-6 md:px-8 text-sm md:text-base text-charcoal tracking-[0.3em] font-montserrat uppercase font-medium whitespace-nowrap">
              Therapy By Mohana Rupa
            </p>
            <div className="flex-1 h-[1px] bg-charcoal"></div>
          </div>

          <p className="text-base md:text-lg lg:text-xl text-charcoal/80 mb-14 max-w-4xl mx-auto leading-relaxed font-montserrat font-normal tracking-wide">
            Providing compassionate guidance through digital-age challenges, life transitions,<br className="hidden md:block" />
            and inner struggles—helping you navigate these to find clarity and strength.
          </p>

          <div className="flex justify-center items-center mb-8">
            <Link
              href="/book"
              className="bg-teal hover:bg-teal/90 text-white rounded-full font-medium text-lg px-12 py-4 shadow-soft hover:shadow-medium transition-all duration-300 font-montserrat"
            >
              Book a session
            </Link>
          </div>
        </div>
      </div>
      <img
        src="/images/rupa_doodle.svg"
        className="absolute top-72 right-0 w-32 md:w-48 lg:w-64"
      />
    </section>
  );
}

// Approach Banner Section
function ApproachBannerSection() {
  return (
    <section className="bg-black text-white py-6 md:py-8">
      <div className="container-custom">
        <p className="text-center text-xs md:text-sm tracking-widest uppercase font-montserrat">
          Evidence-based approaches blended with life coaching and insights
          inspired by timeless Indian philosophical wisdom.
        </p>
      </div>
    </section>
  );
}

// About Preview Section
function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="text-xs tracking-widest font-montserrat text-black/60 mb-2 uppercase font-medium">Meet</div>
            <h2 className={`text-4xl lg:text-5xl tracking-wide text-charcoal mb-1 font-awesome-serif uppercase leading-tight`}>
              Dr. Mohana
            </h2>
            <h2 className={`text-4xl lg:text-5xl tracking-wide text-charcoal mb-4 font-awesome-serif uppercase leading-tight`}>
              Rupa Nekkanti
            </h2>
            <p className={`text-xs md:text-sm tracking-widest font-montserrat uppercase mb-8 text-black/60 font-medium`}>
              Psychotherapist &amp; Behavioral Specialist
            </p>
            <div className="flex flex-col gap-4 text-sm md:text-base text-charcoal/80 font-montserrat leading-relaxed mb-8 max-w-xl">
              <p>
                Namaste!
                <br /><br />
                I am Dr. Mohana Rupa Nekkanti, founder of Mantrana therapy. I am
                a Psychotherapist and Behavioural Specialist with a Ph.D. in
                Applied Psychology and advanced certifications in Clinical
                Hypnosis and Neuro-Linguistic Programming.
              </p>
              <p>
                As a Behavioral Specialist, I help individuals reshape unhelpful
                patterns—whether it's digital habits, stress responses, or
                relationship dynamics—so they can live with greater balance and
                clarity.
              </p>
            </div>

            <Link href="/about" className="text-xs font-semibold tracking-widest text-charcoal uppercase border-b-2 border-charcoal/30 pb-1 hover:text-teal hover:border-teal transition-colors">
              Read My Story →
            </Link>
          </div>
          <div className="order-1 lg:order-2 relative flex justify-end">
            {/* The Image block matching the organic shape */}
            <div className="bg-background rounded-tr-[100px] rounded-bl-[100px] rounded-tl-[40px] rounded-br-[40px] h-[400px] lg:h-[500px] w-full max-w-md shadow-strong overflow-hidden relative ml-auto">
              <img
                src="/images/mohana_rupa.png"
                className="w-full h-full object-cover object-center"
                alt="Mohana Rupa"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// About Preview Section
function AboutMantranaSection() {
  return (
    <section className="py-16 lg:py-24 bg-white relative">
      <div className="absolute right-0 top-16 bottom-16 left-0 bg-terracotta/90" />
      <div className="container-custom relative z-10 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div>
            <div className="text-xs tracking-widest font-medium font-montserrat text-white/70 mb-2 uppercase">About</div>
            <h2 className={`text-4xl lg:text-5xl tracking-wide text-white mb-8 font-awesome-serif uppercase`}>
              Mantrana
            </h2>
            <div className="flex flex-col gap-4 text-sm md:text-base text-white/90 font-montserrat leading-relaxed mb-10 max-w-xl pr-4">
              <p>
                The name <em>Mantrana</em> is derived from Sanskrit, meaning{" "}
                <strong>counsel, guidance, or thoughtful conversation</strong>. It
                perfectly captures the essence of therapy as I see it—not about
                giving advice or ready-made solutions, but walking alongside you
                as you uncover your own clarity and direction.
              </p>
              <p>
                At Mantrana, therapy is a dedicated space to pause, reflect, and
                realign. Our approach blends evidence-based techniques such as
                Neuro-Linguistic Programming (NLP), Hypnosis, and Cognitive
                Restructuring with timeless insights inspired by Indian wisdom
                traditions.
              </p>
            </div>
            <Link href="/about" className="text-xs font-semibold tracking-widest text-white uppercase border-b-2 border-white/50 pb-1 hover:text-black hover:border-black transition-colors">
              Read More →
            </Link>
          </div>
          <div className="h-64 lg:h-[400px] w-full rounded-r-full rounded-l-[40px] overflow-hidden relative shadow-strong bg-white p-4">
            <div className="w-full h-full rounded-r-full rounded-l-[30px] overflow-hidden">
              <img
                src={"/images/indian_mental_health.jpg"}
                className="w-full h-full object-cover object-center"
                alt="About Mantrana"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  const services = [
    {
      title: "Individual Therapy",
      description:
        "A safe, non-judgmental space for self-reflection and personal growth through evidence-based approaches.",
      icon: "🧠",
    },
    {
      title: "Digital-Age Challenges",
      description:
        "Support for digital addiction, stress, and navigating life in the modern world with mindfulness.",
      icon: "📱",
    },
    {
      title: "Life Transitions",
      description:
        "Compassionate guidance through major life changes, relationships, and inner struggles.",
      icon: "🌱",
    },
    {
      title: "Personal Growth",
      description:
        "Empowering you to discover clarity and strength through Cognitive Restructuring, NLP, and Hypnosis.",
      icon: "✨",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-emerald">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="text-xs tracking-widest font-medium font-montserrat text-white/60 mb-2 uppercase">Offers</div>
          <h2 className={`text-4xl lg:text-5xl text-background mb-6 font-awesome-serif uppercase tracking-wide`}>
            Our Services
          </h2>
          <p className="text-sm md:text-base text-background/80 max-w-2xl mx-auto leading-relaxed font-montserrat tracking-wide">
            Support for digital addiction, stress, relationships, and personal growth through evidence-based approaches and insights inspired by Indian philosophical wisdom.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-background rounded-[30px] p-8 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center"
            >
              <div className="text-4xl mb-6 bg-teal/10 w-16 h-16 rounded-full flex items-center justify-center">{service.icon}</div>
              <h3 className="text-xl font-awesome-serif text-emerald uppercase tracking-wider mb-4">
                {service.title}
              </h3>
              <p className="text-charcoal/80 leading-relaxed font-montserrat text-sm font-medium">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Aruna M.",
      text: "Mohana's guidance helped me overcome my anxiety and find peace within myself. The sessions were transformative.",
      rating: 5,
    },
    {
      name: "Raj K.",
      text: "Professional, compassionate, and incredibly insightful. My life coaching sessions have changed my perspective completely.",
      rating: 5,
    },
    {
      name: "Sneha P.",
      text: "I was struggling with digital burnout. The cognitive restructuring tools provided here completely reshaped my daily life.",
      rating: 5,
    },
    {
      name: "Vivek S.",
      text: "Highly recommended for anyone navigating life transitions. The blend of modern therapy and wisdom is unique and effective.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="testimonials">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="text-xs tracking-widest font-medium font-montserrat text-black/60 mb-2 uppercase">Testimonials</div>
          <h2 className="text-4xl lg:text-5xl font-awesome-serif text-charcoal mb-6 uppercase tracking-wide">
            What Clients Say
          </h2>
          <p className="text-sm md:text-base font-montserrat uppercase tracking-wider text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
            Real stories from people who have experienced positive
            transformation through our services.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-background rounded-[30px] p-8 lg:p-12 transition-shadow duration-300">
              <div className="flex mb-6 text-[#DDA74A]">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-charcoal/80 mb-8 leading-relaxed font-montserrat italic font-medium">
                "{testimonial.text}"
              </p>
              <p className="font-semibold text-charcoal font-montserrat uppercase tracking-wider text-sm">
                — {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Blog Preview Section
function BlogSection() {
  const blogPosts = [
    {
      title: "Understanding Anxiety: A Guide to Managing Daily Stress",
      excerpt:
        "Learn practical techniques to manage anxiety and create a more peaceful daily routine.",
      category: "Mental Health",
      readTime: "5 min read",
      slug: "understanding-anxiety-managing-daily-stress",
      color: "bg-terracotta",
    },
    {
      title: "The Power of Mindfulness in Relationships",
      excerpt:
        "Discover how mindfulness practices can improve communication and deepen connections.",
      category: "Relationships",
      readTime: "7 min read",
      slug: "power-of-mindfulness-in-relationships",
      color: "bg-teal",
    },
    {
      title: "Building Resilience: Tools for Life's Challenges",
      excerpt:
        "Explore strategies to build emotional resilience and navigate life's ups and downs.",
      category: "Personal Growth",
      readTime: "6 min read",
      slug: "building-resilience-tools-for-challenges",
      color: "bg-emerald",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="text-xs tracking-widest font-medium font-montserrat text-black/60 mb-2 uppercase">Journal</div>
          <h2 className="text-4xl lg:text-5xl font-awesome-serif text-charcoal mb-6 uppercase tracking-wide">
            Latest Insights
          </h2>
          <p className="text-sm md:text-base font-montserrat uppercase tracking-wider text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
            Helpful articles and insights on mental health, personal growth, and
            wellness to support your journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Link key={index} href={`/blog/${post.slug}`}>
              <article className="bg-white rounded-[30px] overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-2 cursor-pointer h-full flex flex-col border border-black/5">
                <div className={`h-48 relative overflow-hidden ${post.color}`}>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-semibold tracking-wider uppercase text-charcoal bg-white px-4 py-1.5 rounded-full shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold tracking-widest uppercase text-charcoal/50">Recent</span>
                    <span className="text-xs font-semibold tracking-widest uppercase text-charcoal/50">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-awesome-serif text-charcoal uppercase mb-4 leading-tight hover:text-teal transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-charcoal/70 leading-relaxed font-montserrat text-sm mb-4 font-medium flex-1">
                    {post.excerpt}
                  </p>
                  <div className="text-xs font-semibold tracking-widest text-teal uppercase border-b-2 border-teal/30 inline-block w-max pb-1">
                    Read Article →
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link href="/blog" className="bg-teal hover:bg-teal/90 text-white rounded-full font-semibold text-sm tracking-widest uppercase px-10 py-4 transition-colors inline-block">
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="bg-background pt-16">
      <div className="container-custom relative z-20 -mb-12 md:-mb-24 lg:-mb-32 flex justify-center">
        <img
          src="/images/mantrana_board.png"
          alt="Dr. Mohana Rupa Banner"
          className="w-full max-w-5xl h-auto shadow-medium"
        />
      </div>

      <div className="bg-charcoal text-white pt-24 md:pt-40 pb-20 md:pb-32 relative overflow-hidden">
        <img
          src="/images/white_mantrana.png"
          className="absolute -bottom-[10%] -left-[5%] w-[300px] md:w-[500px] pointer-events-none opacity-[0.4] select-none"
          alt="Decorative"
        />
        <img
          src="/images/white_mantrana.png"
          className="-scale-x-100 absolute -bottom-[10%] -right-[5%] w-[300px] md:w-[500px] opacity-[0.4] pointer-events-none select-none"
          alt="Decorative"
        />
        <div className="container-custom text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-awesome-serif text-white mb-6 uppercase tracking-wide leading-tight">
              Begin Your Journey Today
            </h2>
            <p className="text-sm md:text-base font-montserrat text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              Take the first step towards healing, growth, and inner clarity.<br className="hidden md:block" />
              Book a session or start with a free consultation call.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/book"
                className="bg-white/90 hover:bg-white text-charcoal hover:shadow-soft transition-all duration-300 font-semibold text-sm px-8 py-3.5 rounded-full"
              >
                Book a session
              </Link>
              <Link
                href="/contact"
                className="border border-white/50 hover:border-white text-white transition-colors font-semibold text-sm px-8 py-3.5 rounded-full"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutSection />
      <AboutMantranaSection />
      <ServicesSection />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
      <Footer />
    </main>
  );
}
