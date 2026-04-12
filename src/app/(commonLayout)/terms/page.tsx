export default function TermsOfServicePage() {
     return (
          <div className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
               <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#181759] mb-4">
                         Terms of Service
                    </h1>
                    <p className="text-gray-500">Last Updated: October 2025</p>
               </div>

               <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-lg prose-indigo max-w-none text-gray-700">
                    <p className="lead text-xl text-gray-600 mb-8">
                         Welcome to Planora. These Terms of Service ("Terms") govern your use of the Planora website, applications, and services. By accessing or using our platform, you agree to be bound by these Terms.
                    </p>

                    <h2 className="text-2xl font-bold text-[#181759] mt-10 mb-4">1. Acceptance of Terms</h2>
                    <p className="mb-6">
                         By creating an account, purchasing a ticket, or otherwise using the Planora platform, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, you may not use our services.
                    </p>

                    <h2 className="text-2xl font-bold text-[#181759] mt-10 mb-4">2. Description of Service</h2>
                    <p className="mb-6">
                         Planora provides an online platform that allows event organizers to create, manage, and promote events, and allows attendees to discover and purchase tickets for these events. We act as an intermediary between organizers and attendees and are not responsible for the actual events.
                    </p>

                    <h2 className="text-2xl font-bold text-[#181759] mt-10 mb-4">3. User Accounts</h2>
                    <p className="mb-4">To use certain features of the platform, you must register for an account. You agree to:</p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                         <li>Provide accurate, current, and complete information during registration.</li>
                         <li>Maintain and promptly update your account information.</li>
                         <li>Maintain the security of your password and accept all risks of unauthorized access to your account.</li>
                         <li>Immediately notify us if you discover or suspect any security breaches related to the platform.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[#181759] mt-10 mb-4">4. Ticketing and Refunds</h2>
                    <p className="mb-6">
                         When you purchase a ticket on Planora, you are purchasing from the event organizer, not from Planora itself. Refund policies are determined by the respective organizers. Planora will facilitate refunds only in accordance with the organizer's specified policy or in cases where an event is completely cancelled.
                    </p>

                    <h2 className="text-2xl font-bold text-[#181759] mt-10 mb-4">5. Organizer Responsibilities</h2>
                    <p className="mb-6">
                         If you are an organizer, you are entirely responsible for the events you list. This includes ensuring accurate event details, pricing, and honoring commitments made to attendees. You also agree not to post content that is illegal, offensive, or violates intellectual property rights.
                    </p>

                    <h2 className="text-2xl font-bold text-[#181759] mt-10 mb-4">6. Limitation of Liability</h2>
                    <p className="mb-6">
                         To the fullest extent permitted by applicable law, Planora, its affiliates, directors, or employees shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.
                    </p>

                    <h2 className="text-2xl font-bold text-[#181759] mt-10 mb-4">7. Contact Us</h2>
                    <p>
                         If you have any questions regarding these Terms, please contact us at:<br/>
                         <a href="mailto:legal@planora.com" className="text-[#FE7743] hover:underline font-semibold mt-2 inline-block">legal@planora.com</a>
                    </p>
               </div>
          </div>
     );
}
