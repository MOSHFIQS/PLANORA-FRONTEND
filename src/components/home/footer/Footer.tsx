import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
     return (
          <footer className="mt-5 pt-12 border-t border-gray-200 bg-white text-gray-700">
               <div className=" px-6 md:px-12 grid md:grid-cols-4 gap-8">

                    {/* Brand Info */}
                    <div>
                         <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[#181759]">
                              <Image src="/logo/logo.png" width={30} height={30} alt="logo" />
                              <span>PLANORA</span>
                         </h3>
                         <p className="text-sm leading-relaxed">
                              Discover EVENTS crafted to elevate your style.
                              Shop authentic perfumes with confidence and elegance.
                         </p>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center">
                         <h4 className="text-lg font-extrabold mb-4">Quick Links</h4>
                         <ul className="space-y-2 text-sm text-[#725CAD] font-bold">
                              <li>
                                   <Link href="/" className="hover:text-[#181759] transition">
                                        Home
                                   </Link>
                              </li>
                              <li>
                                   <Link href="/events" className="hover:text-[#181759] transition">
                                             Events
                                   </Link>
                              </li>
                              <li>
                                   <Link href="/about-us" className="hover:text-[#181759] transition">
                                        About Us
                                   </Link>
                              </li>
                              <li>
                                   <Link href="/contact-us" className="hover:text-[#181759] transition">
                                        Contact
                                   </Link>
                              </li>
                         </ul>
                    </div>

                    {/* Support */}
                    <div className="text-center">
                         <h4 className="text-lg font-semibold mb-4">Customer Support</h4>
                         <ul className="space-y-2 text-sm text-[#725CAD] font-bold">
                              <li>
                                   Email:{" "}
                                   <a
                                        href="mailto:support@afranperfume.com"
                                        className="hover:text-[#181759]"
                                   >
                                        support@planora.com
                                   </a>
                              </li>
                              <li>
                                   Phone:{" "}
                                   <a
                                        href="tel:+880123456789"
                                        className="hover:text-[#181759]"
                                   >
                                        +880123456789
                                   </a>
                              </li>
                              <li>
                                   <Link href="/faq" className="hover:text-[#181759]">
                                        FAQs
                                   </Link>
                              </li>
                              <li>
                                   <Link href="/terms-condition" className="hover:text-[#181759]">
                                        Terms & Conditions
                                   </Link>
                              </li>
                         </ul>
                    </div>

                    {/* Social */}
                    <div className="text-center w-full">
                         <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                         <div className="flex space-x-3 items-center justify-center">
                              <Link href="/" className="p-2 rounded-full bg-[#725CAD] hover:bg-[#5A488C] transition">
                                   <Facebook className="w-5 h-5 text-white" />
                              </Link>
                              <Link href="/" className="p-2 rounded-full bg-[#725CAD] hover:bg-[#5A488C] transition">
                                   <Twitter className="w-5 h-5 text-white" />
                              </Link>
                              <Link href="/" className="p-2 rounded-full bg-[#725CAD] hover:bg-[#5A488C] transition">
                                   <Instagram className="w-5 h-5 text-white" />
                              </Link>
                              <Link href="/" className="p-2 rounded-full bg-[#725CAD] hover:bg-[#5A488C] transition">
                                   <Linkedin className="w-5 h-5 text-white" />
                              </Link>
                         </div>
                    </div>
               </div>

               {/* Bottom */}
               <div className="border-t border-gray-200 mt-12 py-4 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} PLANORA. Crafted with excellence .
               </div>
          </footer>
     );
}