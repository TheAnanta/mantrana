import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Refund Policy | Mantrana by Mohana Rupa",
  description:
    "Understand our refund and cancellation policy for therapy sessions and packages. We are committed to fair and transparent practices.",
};

export default function RefundPolicyPage() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-lavender via-white to-azure">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Refund <span className="text-moss">Policy</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Fair and transparent refund guidelines for our services
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
                  Our Commitment
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  At Mantrana, we are committed to providing high-quality therapy
                  and counselling services. We understand that circumstances can
                  change, and we have developed a fair and transparent refund
                  policy to protect both our clients and our practice. Please
                  read this policy carefully before booking any sessions.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Individual Session Refunds
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Cancellation with 24+ Hours Notice
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      If you cancel a scheduled session with at least 24 hours
                      notice, you will receive a full refund or the option to
                      reschedule your session at no additional charge. We
                      understand that life happens, and we appreciate advance
                      notice so we can offer your time slot to another client.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Cancellation with Less Than 24 Hours Notice
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Cancellations made with less than 24 hours notice will
                      result in a 50% cancellation fee. The remaining 50% will be
                      refunded to your original payment method within 5-7
                      business days. This policy helps us manage our schedule and
                      accounts for the reserved time.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No-Show Policy
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      If you do not attend a scheduled session without prior
                      notice (no-show), you will be charged the full session fee
                      with no refund. We reserve this time specifically for you,
                      and a no-show prevents us from helping other clients during
                      that time.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Session Package Refunds
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Before First Session
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      If you purchase a session package but decide not to proceed
                      before attending your first session, you may receive a full
                      refund within 7 days of purchase. After 7 days, a 10%
                      administrative fee will be deducted from the refund amount.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      After Starting Package
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      If you have already attended one or more sessions from your
                      package and wish to discontinue, you may receive a partial
                      refund. The refund will be calculated as follows: (Total
                      Package Price - Individual Session Price × Sessions
                      Attended - 10% Administrative Fee). Note that the
                      individual session price is higher than the discounted
                      package rate.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Package Expiration
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Session packages are valid for 6 months from the date of
                      purchase. After 6 months, unused sessions expire and no
                      refund will be provided. We encourage you to schedule your
                      sessions regularly to make the most of your package.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Therapist-Initiated Cancellations
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  In the rare event that we need to cancel or reschedule a
                  session due to therapist illness, emergency, or other
                  unforeseen circumstances:
                </p>
                <ul className="space-y-3 text-lg text-gray-600">
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      You will be notified as soon as possible
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      You will receive a full refund or the option to reschedule
                      at your convenience
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      No cancellation fees will be charged to you
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      We will work with you to minimize any inconvenience
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Emergency and Exceptional Circumstances
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  We understand that genuine emergencies and exceptional
                  circumstances can arise. If you need to cancel due to:
                </p>
                <ul className="space-y-3 text-lg text-gray-600 mb-4">
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>Medical emergencies requiring hospitalization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>Death of an immediate family member</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>Natural disasters or severe weather conditions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>Other documented emergencies</span>
                  </li>
                </ul>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Please contact us as soon as possible to discuss your
                  situation. We will review each case individually and may waive
                  cancellation fees or provide full refunds at our discretion.
                  Documentation may be required.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Refund Processing
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Timeline
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      All approved refunds will be processed within 5-7 business
                      days. Depending on your bank or payment provider, it may
                      take an additional 5-10 business days for the refund to
                      appear in your account.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Refund Method
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Refunds will be issued to the original payment method used
                      for the purchase. If this is not possible, we will work
                      with you to arrange an alternative refund method.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Requesting a Refund
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      To request a refund, please contact us via email at
                      refunds@mantrana.in with your booking details and the
                      reason for your refund request. We will review your request
                      and respond within 2 business days.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Non-Refundable Services
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  The following services and fees are non-refundable:
                </p>
                <ul className="space-y-3 text-lg text-gray-600">
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      Completed therapy sessions that were attended
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      Digital materials, worksheets, or resources that have been
                      accessed or downloaded
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      Administrative fees (where applicable)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-moss mr-3">•</span>
                    <span>
                      Consultation fees for completed consultations
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Dissatisfaction with Services
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  If you are dissatisfied with the quality of our services,
                  please contact us immediately. We take client satisfaction
                  seriously and will work with you to address your concerns. In
                  some cases, we may offer a partial refund or complimentary
                  session based on the specific circumstances. However, please
                  note that therapy is a subjective process, and outcomes cannot
                  be guaranteed. Refunds for dissatisfaction are evaluated on a
                  case-by-case basis.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Payment Disputes
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  If you dispute a charge with your bank or payment provider
                  before contacting us, we will be unable to provide services
                  until the dispute is resolved. We encourage you to contact us
                  first so we can work together to resolve any billing issues or
                  concerns directly.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Changes to This Policy
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We reserve the right to update or modify this Refund Policy at
                  any time. Changes will be effective immediately upon posting on
                  our website. Your purchase or use of our services after changes
                  are posted constitutes your acceptance of the modified policy.
                  However, any changes will not affect refunds for services
                  purchased before the policy change.
                </p>
              </div>

              <div className="bg-lavender/20 rounded-2xl p-8 mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Questions About Refunds?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  If you have any questions about our Refund Policy or need to
                  request a refund, please contact us:
                </p>
                <div className="space-y-2 text-lg text-gray-600">
                  <p>
                    <strong>Email:</strong> refunds@mantrana.in
                  </p>
                  <p>
                    <strong>Phone:</strong> Available upon request
                  </p>
                  <p className="mt-4 text-base">
                    We are committed to handling all refund requests fairly and
                    promptly. Please allow 2 business days for us to review and
                    respond to your request.
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
