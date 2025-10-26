import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Services | Mantrana by Mohana Rupa",
  description:
    "Healing begins with understanding. Individual therapy, couples therapy, behavioural coaching, digital well-being therapy, trainings, and community mental wellness advocacy.",
};

export default function ServicesPage() {
  const services = [
    {
      id: "individual-therapy",
      title: "Individual Therapy",
      subtitle: "Understanding patterns. Building balance. Creating change.",
      icon: "🧠",
      image:
        "https://addictiontreatmentcentersofmd.com/wp-content/uploads/2024/05/Personal-Growth-and-Transformation-836x1024.jpg",
      description:
        "Every behaviour tells a story — shaped by our thoughts, emotions, and life experiences. In therapy, we explore these patterns together to understand what drives them and how they impact your well-being. Whether it's overthinking, people-pleasing, emotional overwhelm, or difficulty managing relationships, change begins with awareness and guided practice.",
      content: `As a behavioural specialist, I work with evidence-based approaches to help you recognize unhelpful patterns, strengthen self-regulation, and develop healthier coping responses. Our sessions are designed to foster emotional clarity, inner balance, and behavioural flexibility — so you can respond to life with confidence rather than react from habit.

Therapy can be both a mirror and a map — reflecting where you are and guiding you toward where you wish to be. Sessions are available both online and offline, offering a confidential and supportive space for growth and transformation.`,
      features: [
        "Feel stuck in repetitive emotional or behavioural patterns",
        "Struggle with overthinking, procrastination, or self-doubt",
        "Find it hard to balance personal and professional boundaries",
        "Experience stress, burnout, anxiety or emotional fatigue",
        "Wish to cultivate calm, clarity, and resilience in everyday life",
        "Obsessive Compulsive Disorder",
        "Weight Management",
        "Sleep disorders and more ….",
      ],
    },
    {
      id: "couples-therapy",
      title: "Couples Therapy",
      subtitle: "From reaction to understanding. From conflict to connection.",
      icon: "💕",
      image:
        "https://images.bannerbear.com/direct/4mGpW3zwpg0ZK0AxQw/requests/000/093/756/418/P523LdrvK61p4P89z7nypx4jW/df0c9bb41807e1652aa088131c1f555caad7f21b.jpg",
      description:
        "Relationships often mirror our deepest patterns — how we communicate, express needs, handle stress, or seek validation. Over time, unspoken expectations, emotional distance, or repeated misunderstandings can quietly erode connection.",
      content: `Through a behavioural approach, couples therapy helps partners understand not just what they are fighting about, but how they are relating to each other. We explore emotional triggers, communication styles, and the underlying patterns that fuel conflict or silence. Together, we learn new ways to respond rather than react — creating space for empathy, respect, and trust to grow again.

This process is not about assigning blame, but about rebuilding awareness and emotional attunement. Whether the challenge is constant arguments, withdrawal, lack of intimacy, or difficulty balancing personal and shared goals, therapy offers tools to strengthen understanding and connection.

Couples therapy can be a journey back to understanding — where each partner learns not only to listen but to be heard. Whether the path leads to renewed connection or to parting ways with clarity and compassion, the goal is the same — to respond with awareness, respect, and emotional balance.`,
      features: [
        "Communication breakdown and frequent misunderstandings",
        "Emotional distance, resentment, or lack of trust",
        "Managing conflict without escalating or shutting down",
        "Differences in values, expectations, or parenting styles",
        "Rebuilding connection after a hurt or a disconnection",
        "Navigating transitions — marriage, parenthood, separation, or relocation",
      ],
    },
    {
      id: "behavioural-coaching",
      title: "Behavioural Coaching",
      subtitle: "From awareness to action. From intention to change.",
      icon: "🎯",
      image:
        "https://www.therapytreatmentteam.com/wp-content/uploads/2023/04/Couples-Therapy-1-683x1024.jpg",
      description:
        "Lasting change doesn't happen by willpower alone — it begins with understanding why we do what we do. Behavioural coaching bridges that gap between knowing and doing. It helps you move from insight to practice, translating self-awareness into consistent, meaningful action.",
      content: `This space is designed for individuals who want to break unhelpful habits, build emotional regulation, and align their everyday actions with their goals and values. Whether it's managing procrastination, improving communication, setting boundaries, or cultivating self-discipline, coaching supports you in creating steady, sustainable shifts in your thoughts, emotions, and behaviours.

Drawing from principles of Cognitive Restructuring, NLP, and Behavioural Psychology, each session focuses on developing practical tools — helping you identify triggers, reshape responses, and strengthen patterns that support your growth.

Behavioural coaching isn't about quick fixes — it's about conscious transformation. With guided reflection, practice, and accountability, you learn to lead your own change with clarity and confidence.`,
      features: [
        "Overcome self-sabotage, indecision, and inner resistance",
        "Replace unproductive routines with mindful, goal-aligned habits",
        "Improve emotional intelligence and communication at work or home",
        "Strengthen focus, self-motivation, and consistency",
        "Create personal systems that help you thrive, not just cope",
      ],
    },
    {
      id: "digital-wellbeing",
      title: "Therapy for Digital Well-being",
      subtitle: "Reclaim focus. Restore balance. Redefine connection.",
      icon: "📱",
      image:
        "https://img.freepik.com/free-photo/married-interracial-couple-using-smartphone-home-multi-ethnic-partners-talking-while-looking-modern-device-sitting-couch-living-room-mixed-race-people-with-technology_482257-28762.jpg?semt=ais_hybrid&w=740&q=80",
      description:
        "In a world that's always online, it's easy to lose touch with our inner stillness. Constant scrolling, endless notifications, and digital comparison can slowly shape our thoughts, moods, and even our sense of self. What begins as connection can often turn into exhaustion — mentally, emotionally, and socially.",
      content: `As a behavioural specialist with research expertise in social media and digital addiction, I help individuals understand the psychology behind their screen use — what drives it, how it affects focus, mood, sleep, and relationships, and how to consciously reshape those habits.

Therapy in this space goes beyond simply "reducing screen time." It's about restoring control, balance, and presence in a tech-driven world. We explore emotional triggers, reward loops, and the deeper needs that keep you digitally hooked — helping you move toward mindful use, improved focus, and inner calm.

This therapy is not about disconnecting from technology — it's about reconnecting with yourself. When your digital life aligns with your real-life values, balance naturally follows.`,
      features: [
        "Overuse of social media or digital devices",
        "Anxiety, FOMO, and comparison fatigue",
        "Sleep disturbance and attention difficulties",
        "Emotional dependency on online validation",
        "Work-life imbalance due to digital overload",
        "Managing digital boundaries and mindful usage",
      ],
    },
    {
      id: "trainings-workshops",
      title: "Trainings and Workshops",
      subtitle: "Learn, Reflect, Transform — together",
      icon: "👥",
      image:
        "https://www.accelerate.uk.com/wp-content/uploads/2016/11/iStock-531933576.jpg",
      description:
        "Trainings and workshops are thoughtfully designed spaces where participants come together to learn, engage, and grow under expert guidance. Each session blends meaningful discussions, interactive activities, and hands-on learning experiences that help participants internalize new skills and insights.",
      content: `Participants may take part in reflective exercises, group collaborations, and role-play practices that make the learning process dynamic and experiential. The environment remains supportive and participative—encouraging curiosity, sharing, and self-discovery.

By the end of the program, individuals leave not only with practical tools and clarity of understanding, but also with renewed motivation and actionable takeaways that they can apply in their personal and professional lives.

**Benefits of Trainings and Workshops:** Trainings and workshops create a nurturing space for both professional and personal growth. They not only build skills and enhance knowledge but also deepen self-awareness, emotional balance, and interpersonal effectiveness. Participants gain practical tools, confidence, and clarity while learning to manage stress, communicate mindfully, and adapt with resilience. These sessions foster meaningful connection, motivation, and holistic well-being—benefiting individuals and organizations alike.`,
      features: [],
    },
    {
      id: "community-advocacy",
      title: "Community Mental Wellness Advocacy",
      subtitle: "Because mental health is everyone's responsibility.",
      icon: "🌍",
      image:
        "https://www.verywellmind.com/thmb/21kFKDdAa9QbpqqwY8vrRpq085U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1223682335-acbb9dd4607a4630951f59e9c06db6c1.jpg",
      description:
        "At Mantrana Therapy, we believe in the power of community to foster mental wellness for all its members. Community mental wellness advocacy involves active efforts to support, promote, and improve mental health within communities. This includes raising awareness, reducing stigma, influencing policies, and building supportive, inclusive environments where everyone can thrive emotionally and mentally.",
      content: `In today's fast-paced digital world, where face-to-face communication and verbal interactions are often reduced, mental health challenges are becoming increasingly complex. As behavioural specialists, we understand the critical importance of nurturing authentic, meaningful human connections and providing tailored behavioural support that addresses these modern challenges.

Our approach emphasises community-led initiatives, collaboration with local organizations, and empowering individuals to take charge of their mental health journeys. We focus on strengthening social connections, improving access to mental health resources, and championing culturally sensitive practices. Together, through collective action and shared responsibility, we strive to create resilient and thriving communities that prioritize mental well-being.

We are open to collaborate with individuals, groups, and organizations passionate about advancing community mental wellness. If you share our vision, we welcome the opportunity to connect and work together to make a meaningful impact.`,
      features: [],
    },
  ];

  const packages = [
    {
      name: "First Session",
      price: "₹299",
      description:
        "Your first 30-minute session — a gentle step to understand your needs and plan your path forward.",
      features: [
        "30-minute session",
        "Understand your needs",
        "Plan your therapy journey",
        "No long-term commitment",
      ],
      popular: true,
    },
    {
      name: "Regular Session",
      price: "",
      description:
        "Standard 60-minute therapy session for continued support and growth.",
      features: [
        "60-minute session",
        "Personalized approach",
        "Follow-up resources",
        "Flexible scheduling",
      ],
      disabled: true,
    },
  ];

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-lavender">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Healing begins with understanding.
            </p>
            <p className="text-lg text-gray-600 mt-6 leading-relaxed max-w-3xl mx-auto">
              In this fast-paced digital world, where mental well-being is often
              overlooked, Mantrana offers a space for reflection, dialogue, and
              growth. Our services are thoughtfully designed to help
              individuals, couples, and communities find balance — within
              themselves, their relationships, and their daily lives.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding !pt-[4rem] bg-white">
        <div className="container-custom">
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
              Each service is designed with your healing and growth in mind,
              offering professional support for every stage of your wellness
              journey.
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">{service.icon}</div>
                    <div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        {service.title}
                      </h3>
                      {service.subtitle && (
                        <p className="text-lg text-gray-500 italic mt-2">
                          {service.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {service.content && (
                    <div className="text-gray-600 mb-6 leading-relaxed whitespace-pre-line">
                      {service.content}
                    </div>
                  )}

                  {service.features.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        I support individuals who:
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-moss mr-2">•</span>
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Link href="/book" className="btn-pill btn-primary">
                    Book This Service
                  </Link>
                </div>

                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <div className="bg-gradient-to-br from-amaranth/70 to-lavender rounded-3xl h-64 lg:h-[540px] overflow-hidden">
                    <img
                      src={service.image}
                      className="w-full h-full object-cover object-top"
                    />{" "}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Booking
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Begin with Clarity. Your first 30-minute session is only ₹299/— a
              gentle step to understand your needs and plan your path forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-soft relative ${
                  pkg.popular
                    ? "ring-2 ring-moss shadow-medium transform scale-105"
                    : ""
                } ${pkg.disabled ? "opacity-75" : ""}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-moss text-white px-4 py-2 rounded-full text-sm font-medium">
                      Start Here
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {pkg.name}
                  </h3>
                  <div className="mb-3">
                    {pkg.price ? (
                      <span className="text-3xl font-bold text-moss">
                        {pkg.price}
                      </span>
                    ) : (
                      <span className="text-lg font-medium text-gray-500">
                        Contact for pricing
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">{pkg.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-moss mr-2">✓</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                {pkg.disabled ? (
                  <button
                    disabled
                    className="btn-pill w-full text-center block bg-gray-300 text-gray-500 cursor-not-allowed"
                  >
                    Book Offline
                  </button>
                ) : (
                  <Link
                    href="/book"
                    className={`btn-pill w-full text-center block ${
                      pkg.popular
                        ? "btn-primary bg-moss "
                        : "btn-secondary bg-moss/30 text-moss"
                    }`}
                  >
                    Choose This Package
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              <strong>Timings:</strong> Sessions available from 10:00 AM to 7:00
              PM
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-moss to-citron">
        <div className="container-custom text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Your Healing Journey?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed">
            Take the first step towards better mental health and personal
            growth. Book your first session today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/book"
              className="btn-pill bg-white text-moss hover:bg-gray-50 text-lg px-10 py-5"
            >
              Book a Session
            </Link>
            <Link
              href="/contact"
              className="btn-pill border-2 border-white text-white hover:bg-white hover:text-moss text-lg px-10 py-5"
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
