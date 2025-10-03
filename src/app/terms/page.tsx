import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms & Conditions | Mantrana by Mohana Rupa",
  description:
    "Read the terms and conditions for using Mantrana therapy and counselling services. Understand your rights and responsibilities.",
};

export default function TermsPage() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-lavender via-white to-azure">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Terms & <span className="text-moss">Conditions</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Guidelines for using our therapy and counselling services
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
                  Welcome to Mantrana. By accessing or using our therapy and
                  counselling services, you agree to be bound by these Terms and
                  Conditions. Please read them carefully before booking a session
                  or using our services. If you do not agree with any part of
                  these terms, please do not use our services.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Services Provided
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  Mantrana offers professional psychotherapy, counselling, and
                  behavioral therapy services conducted by Mohana Rupa Nekkanti,
                  a licensed psychotherapist and behavioral specialist. Our
                  services include:
                </p>
                <ul className="space-y-3 text-lg text-gray-600">
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>Individual therapy sessions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>Couples and relationship counselling</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>Behavioral modification programs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>Life coaching and personal development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>Online and in-person consultations</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Client Responsibilities
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Accurate Information
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      You agree to provide accurate, complete, and current
                      information about yourself during the intake process and
                      throughout your therapy journey. Misleading or false
                      information may impact the effectiveness of therapy.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Active Participation
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Therapy is a collaborative process that requires your
                      active participation, honesty, and commitment to the
                      therapeutic goals. Your progress depends significantly on
                      your engagement and willingness to implement suggested
                      strategies.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Respectful Conduct
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      You agree to treat the therapist and staff with respect and
                      professionalism. Any form of harassment, threatening
                      behavior, or abuse will result in immediate termination of
                      services.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Appointment Booking and Attendance
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Scheduling
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Appointments can be scheduled through our website, email,
                      or phone. You will receive a confirmation email with the
                      date, time, and session details (online link or location).
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Cancellation Policy
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      If you need to cancel or reschedule an appointment, please
                      provide at least 24 hours notice. Cancellations made with
                      less than 24 hours notice may be subject to a cancellation
                      fee. No-shows will be charged the full session fee.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Late Arrivals
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      If you arrive late for a session, the session will end at
                      the scheduled time and you will be charged for the full
                      session. Please plan accordingly to arrive on time.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Payment Terms
                </h2>
                <ul className="space-y-3 text-lg text-gray-600">
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      Payment is due at the time of booking or before the
                      scheduled session
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      We accept various payment methods including credit/debit
                      cards, UPI, and bank transfers
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      Session packages must be paid in full at the time of
                      purchase
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      Package sessions are valid for 6 months from the date of
                      purchase
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      Pricing is subject to change, but booked sessions honor the
                      price at the time of booking
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Confidentiality
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  All information shared during therapy sessions is strictly
                  confidential and protected under professional ethical
                  guidelines. However, confidentiality has certain legal limits:
                </p>
                <ul className="space-y-3 text-lg text-gray-600">
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      When there is a risk of harm to yourself or others
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>When required by law or court order</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>In cases of suspected child or elder abuse</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>When you provide written consent to share information</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Limitations and Disclaimers
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Not Emergency Services
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Our services are not intended for emergency mental health
                      situations. If you are experiencing a crisis, please
                      contact emergency services (dial 112), visit your nearest
                      emergency room, or call a crisis helpline immediately.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No Guarantees
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      While we are committed to providing high-quality therapy
                      services, we cannot guarantee specific outcomes or results.
                      Therapy is a collaborative process, and results vary based
                      on individual circumstances and commitment.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Professional Relationship
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      The relationship between client and therapist is
                      professional in nature. Any requests for relationships
                      outside of therapy (social, business, or romantic) are
                      inappropriate and will result in termination of services.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Termination of Services
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  Either party may terminate the therapeutic relationship at any
                  time. However, we encourage discussing any concerns before
                  termination. Services may be terminated by Mantrana in the
                  following circumstances:
                </p>
                <ul className="space-y-3 text-lg text-gray-600">
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      Non-payment of fees or repeated cancellations
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      Inappropriate or threatening behavior
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      When therapy is not beneficial or appropriate for your needs
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      Conflict of interest or ethical concerns
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Intellectual Property
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  All content, materials, and resources provided during therapy
                  sessions or through our website are the intellectual property
                  of Mantrana and Mohana Rupa Nekkanti. You may not reproduce,
                  distribute, or share these materials without explicit written
                  permission.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Liability Limitation
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To the fullest extent permitted by law, Mantrana and Mohana
                  Rupa Nekkanti shall not be liable for any indirect,
                  incidental, special, consequential, or punitive damages arising
                  from your use of our services or inability to use our services.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Changes to Terms
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We reserve the right to modify these Terms and Conditions at
                  any time. Changes will be effective immediately upon posting on
                  our website. Your continued use of our services after changes
                  are posted constitutes your acceptance of the modified terms.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Governing Law
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  These Terms and Conditions shall be governed by and construed
                  in accordance with the laws of India. Any disputes arising from
                  these terms or our services shall be subject to the exclusive
                  jurisdiction of the courts in the applicable jurisdiction.
                </p>
              </div>

              <div className="bg-lavender/20 rounded-2xl p-8 mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Questions About These Terms?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  If you have any questions or concerns about these Terms and
                  Conditions, please contact us:
                </p>
                <div className="space-y-2 text-lg text-gray-600">
                  <p>
                    <strong>Email:</strong> info@mantrana.in
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
