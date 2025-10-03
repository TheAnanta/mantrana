import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Mantrana by Mohana Rupa",
  description:
    "Learn how Mantrana protects your privacy and handles your personal information. Your privacy and confidentiality are our top priorities.",
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-lavender via-white to-azure">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Privacy <span className="text-moss">Policy</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Your privacy and confidentiality are our top priorities
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-gray-600 mb-8">
              <strong>Last Updated:</strong> January 2025
            </p>

            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Introduction
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  At Mantrana, we are deeply committed to protecting your
                  privacy and maintaining the confidentiality of your personal
                  information. This Privacy Policy outlines how we collect, use,
                  store, and protect your data when you use our therapy and
                  counselling services.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Information We Collect
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Personal Information
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      When you book a session or create an account, we collect
                      personal information such as your name, email address,
                      phone number, and other contact details necessary to
                      provide our services.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Health Information
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      During therapy sessions, we may collect sensitive health
                      information including your mental health history, current
                      concerns, and treatment progress. This information is
                      handled with the highest level of confidentiality and is
                      protected under professional ethical guidelines.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Technical Information
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      We automatically collect certain technical information when
                      you visit our website, including your IP address, browser
                      type, device information, and pages visited. This helps us
                      improve our website and services.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  How We Use Your Information
                </h2>
                <ul className="space-y-3 text-lg text-gray-600">
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      To provide therapy and counselling services tailored to
                      your needs
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      To schedule and manage appointments and communicate with
                      you
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>To process payments and maintain billing records</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      To improve our services and develop new therapeutic
                      approaches
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      To comply with legal and professional obligations
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Confidentiality and Data Security
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  We implement robust security measures to protect your personal
                  and health information, including:
                </p>
                <ul className="space-y-3 text-lg text-gray-600">
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      Encrypted storage and transmission of sensitive data
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      Secure video conferencing platforms for online sessions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      Limited access to your information on a need-to-know basis
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      Regular security audits and updates to our systems
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Information Sharing
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  We maintain strict confidentiality and do not share your
                  personal or health information with third parties, except in
                  the following limited circumstances:
                </p>
                <ul className="space-y-3 text-lg text-gray-600">
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>With your explicit written consent</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      When required by law or legal proceedings
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      To prevent imminent harm to you or others
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      With trusted service providers who assist in delivering
                      our services (under strict confidentiality agreements)
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Your Rights
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  You have the following rights regarding your personal
                  information:
                </p>
                <ul className="space-y-3 text-lg text-gray-600">
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      Access and review your personal and health information
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      Request corrections to inaccurate or incomplete information
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      Request deletion of your information (subject to legal and
                      professional retention requirements)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>Withdraw consent for certain uses of your data</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Data Retention
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We retain your personal and health information for as long as
                  necessary to provide services and comply with legal,
                  professional, and regulatory requirements. Clinical records are
                  typically maintained for a minimum period as required by law
                  and professional standards.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Cookies and Tracking
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our website uses cookies and similar technologies to enhance
                  your browsing experience, analyze website traffic, and
                  understand user preferences. You can control cookie settings
                  through your browser preferences.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Changes to This Policy
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices or legal requirements. We will notify
                  you of any significant changes by posting the updated policy on
                  our website and updating the "Last Updated" date.
                </p>
              </div>

              <div className="bg-lavender/20 rounded-2xl p-8 mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Contact Us
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  If you have any questions, concerns, or requests regarding this
                  Privacy Policy or how we handle your information, please
                  contact us:
                </p>
                <div className="space-y-2 text-lg text-gray-600">
                  <p>
                    <strong>Email:</strong> privacy@mantrana.in
                  </p>
                  <p>
                    <strong>Phone:</strong> Available upon request
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
