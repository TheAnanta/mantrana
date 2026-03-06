import Link from "next/link";

const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Refund Policy", href: "/refund" },
  ],
  social: [
    {
      name: "Instagram",
      href: "#",
      icon: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.611-3.197-1.559-.748-.948-.748-2.229 0-3.177.749-.948 1.9-1.559 3.197-1.559s2.448.611 3.197 1.559c.748.948.748 2.229 0 3.177-.749.948-1.9 1.559-3.197 1.559z",
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    },
    {
      name: "YouTube",
      href: "#",
      icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-white">
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="text-3xl font-bold text-white mb-6 font-awesome-serif uppercase tracking-widest">Mantrana</div>
            <p className="text-white/70 text-sm md:text-base leading-relaxed mb-8 max-w-md font-montserrat font-medium">
              Psychotherapist &amp; Behavioral Specialist. Providing
              compassionate guidance through digital-age challenges, life
              transitions, and inner struggles—helping you find clarity and
              strength.
            </p>
            <div className="text-xs text-white/50 font-montserrat uppercase tracking-wider">
              <p className="mb-2">
                &copy; 2024 Mantrana by Mohana Rupa. All rights reserved.
              </p>
              <p>Thriving in Balance • Guidance • Clarity</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold text-white/50 mb-6 uppercase tracking-widest font-montserrat">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-white hover:ml-2 transition-all duration-300 font-montserrat text-sm uppercase tracking-wider font-semibold"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Connect */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold text-white/50 mb-6 uppercase tracking-widest font-montserrat">
              Legal
            </h3>
            <ul className="space-y-4 mb-10">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-white hover:ml-2 transition-all duration-300 font-montserrat text-sm uppercase tracking-wider font-semibold"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold text-white/50 mb-6 uppercase tracking-widest font-montserrat">
                Connect
              </h4>
              <div className="flex space-x-6">
                {navigation.social.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white/60 hover:text-white hover:-translate-y-1 transition-all duration-300"
                    aria-label={item.name}
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={item.icon} />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-1 flex flex-col justify-start">
            <h3 className="text-sm font-semibold text-white/50 mb-6 uppercase tracking-widest font-montserrat">
              Stay Connected
            </h3>
            <p className="text-white/80 text-sm mb-6 leading-relaxed font-montserrat font-medium">
              Join our newsletter for wellness tips and updates from Mantrana.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-5 py-4 border border-white/20 bg-white/5 rounded-none focus:outline-none focus:ring-1 focus:ring-white focus:border-white text-white text-sm font-montserrat placeholder:text-white/40"
              />
              <button type="submit" className="bg-white text-black font-semibold uppercase tracking-widest text-sm px-6 py-4 hover:bg-gray-200 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
