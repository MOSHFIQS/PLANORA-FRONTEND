import { Card } from "@/components/ui/card";
import { Search, Mail, Phone, MessageSquare, LifeBuoy } from "lucide-react";

export default function HelpSupportPage() {
     return (
          <div className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
               
               {/* Header Section */}
               <div className="text-center mb-16 bg-[#180f32] text-white rounded p-10 md:p-16 relative overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#725CAD] rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FE7743] rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
                    
                    <div className="relative z-10">
                         <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                              How can we help you?
                         </h1>
                         <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-8">
                              Search our knowledge base or get in touch with our support team. We're here to make your experience perfect.
                         </p>
                         
                         {/* Search Bar */}
                         <div className="max-w-xl mx-auto flex items-center bg-white rounded-full overflow-hidden p-1 shadow-lg">
                              <div className="pl-4 text-gray-400">
                                   <Search size={20} />
                              </div>
                              <input 
                                   type="text" 
                                   placeholder="Search for answers..." 
                                   className="w-full px-4 py-3 outline-none text-gray-800 bg-transparent"
                              />
                              <button className="bg-[#FE7743] hover:bg-[#e06535] text-white px-6 py-3 rounded-full font-semibold transition-colors">
                                   Search
                              </button>
                         </div>
                    </div>
               </div>

               {/* Quick Links / Categories */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    <Card className="border border-gray-200 p-8 rounded-2xl text-center  transition-all duration-300  group">
                         <div className="w-16 h-16 mx-auto bg-[#f4f2fa] text-[#725CAD] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#725CAD] group-hover:text-white transition-colors duration-300">
                              <LifeBuoy size={32} />
                         </div>
                         <h3 className="text-xl font-bold text-[#181759] mb-3">Knowledge Base</h3>
                         <p className="text-gray-600">Browse articles, tutorials, and guides to get the most out of Planora.</p>
                    </Card>

                    <Card className="border border-gray-200 p-8 rounded-2xl text-center  transition-all duration-300  group">
                         <div className="w-16 h-16 mx-auto bg-[#fff1ec] text-[#FE7743] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#FE7743] group-hover:text-white transition-colors duration-300">
                              <MessageSquare size={32} />
                         </div>
                         <h3 className="text-xl font-bold text-[#181759] mb-3">Community Forums</h3>
                         <p className="text-gray-600">Connect with other organizers, share tips, and find event solutions together.</p>
                    </Card>

                    <Card className="border border-gray-200 p-8 rounded-2xl text-center  transition-all duration-300  group">
                         <div className="w-16 h-16 mx-auto bg-[#e8e7ee] text-[#181759] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#181759] group-hover:text-white transition-colors duration-300">
                              <Mail size={32} />
                         </div>
                         <h3 className="text-xl font-bold text-[#181759] mb-3">Contact Support</h3>
                         <p className="text-gray-600">Need specific help? Our dedicated support team is available 24/7.</p>
                    </Card>
               </div>

               {/* FAQs */}
               <div className="max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl font-extrabold text-[#181759] mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                         {[
                              {
                                   q: "How do I create a new event?",
                                   a: "You can create a new event by logging into your dashboard and clicking the 'Create Event' button. Follow the step-by-step wizard to add details, tickets, and publish it."
                              },
                              {
                                   q: "Can I get a refund for an event ticket?",
                                   a: "Refund policies vary by event and organizer. However, our platform allows you to request a refund which will be reviewed by the event organizer according to their specific terms."
                              },
                              {
                                   q: "How do I contact an event organizer?",
                                   a: "On the event details page, scroll down to the 'Organizer' section and click the 'Contact Organizer' button. Your message will be sent directly to their registered email."
                              },
                              {
                                   q: "What payment methods are supported?",
                                   a: "We support major credit cards (Visa, MasterCard, Amex), mobile wallets (bKash, Nagad), and direct bank transfers depending on your region."
                              }
                         ].map((faq, index) => (
                              <details key={index} className="group bg-white border border-gray-200 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                                   <summary className="flex items-center justify-between p-6 cursor-pointer bg-gray-50 group-open:bg-[#181759] group-open:text-white transition-colors duration-300">
                                        <h3 className="font-semibold text-lg">{faq.q}</h3>
                                        <span className="transition group-open:rotate-180">
                                             <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                        </span>
                                   </summary>
                                   <div className="p-6 text-gray-600 leading-relaxed border-t group-open:border-gray-200">
                                        {faq.a}
                                   </div>
                              </details>
                         ))}
                    </div>
               </div>

               {/* Direct Contact Banner */}
               <div className="bg-[#f0f9ff] border border-blue-100 rounded p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                         <h3 className="text-2xl font-bold text-[#181759] mb-2">Still need help?</h3>
                         <p className="text-gray-600">Our customer success team is available around the clock to assist you.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                         <a href="mailto:support@planora.com" className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors font-semibold">
                              <Mail size={18} /> Email Us
                         </a>
                         <a href="tel:+880123456789" className="flex items-center justify-center gap-2 bg-[#725CAD] text-white px-6 py-3 rounded-full hover:bg-[#5b488e] transition-colors font-semibold shadow-md shadow-purple-200">
                              <Phone size={18} /> +880 123 456 789
                         </a>
                    </div>
               </div>

          </div>
     );
}
