"use client";

import {
     Facebook,
     Twitter,
     Instagram,
     Linkedin,
     Phone,
     Mail,
     Send,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
     return (
          <footer className="border-t bg-white text-black mt-10 transition-all duration-500 hover:py-10 transition-all duration-700 ease-in-out">

               {/* Main Footer */}
               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 px-6 md:px-12 py-12 ">

                    {/* Brand */}
                    <div className="flex flex-col gap-5">
                         <div className="flex items-center gap-2">
                              <Image src="/logo/logo.png" width={35} height={35} alt="logo" />
                              <h2 className="text-2xl font-extrabold text-[#181759]">
                                   PLANORA
                              </h2>
                         </div>

                         <p className="text-sm text-gray-600">
                              Discover EVENTS crafted to elevate your lifestyle.
                              Book and explore experiences with confidence.
                         </p>

                         {/* Social */}
                         <div className="flex gap-3">
                              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                   <Link
                                        key={i}
                                        href="/"
                                        className="w-10 h-10 flex items-center justify-center bg-black text-white hover:bg-[#725CAD]  border transition"
                                   >
                                        <Icon size={18} />
                                   </Link>
                              ))}
                         </div>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col gap-4">
                         <h4 className="text-xl font-extrabold">| Contact</h4>

                         <p className="text-sm text-gray-600">
                              Dhaka, Bangladesh
                         </p>

                         <div className="flex items-center gap-2 text-sm">
                              <Phone size={18} />
                              <span>+880123456789</span>
                         </div>

                         <div className="flex items-center gap-2 text-sm">
                              <Mail size={18} />
                              <span>support@planora.com</span>
                         </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col gap-3">
                         <h4 className="text-xl font-extrabold">| Quick Links</h4>

                         {[
                              { name: "Home", href: "/" },
                              { name: "Events", href: "/events" },
                              { name: "About Us", href: "/about-us" },
                              { name: "Contact", href: "/contact-us" },
                         ].map((item, i) => (
                              <Link
                                   key={i}
                                   href={item.href}
                                   className="text-sm hover:text-[#725CAD] transition"
                              >
                                   {item.name}
                              </Link>
                         ))}
                    </div>

                    {/* Newsletter */}
                    <div className="flex flex-col gap-4">
                         <h4 className="text-xl font-extrabold">| Newsletter</h4>

                         <p className="text-sm text-gray-600">
                              Get latest events & updates directly in your inbox.
                         </p>

                         <div className="flex border border-black p-1">
                              <input
                                   type="email"
                                   placeholder="Email Address"
                                   className="w-full px-3 py-2 outline-none bg-transparent text-sm"
                              />
                              <button className="w-12 flex items-center justify-center bg-black text-white hover:bg-[#725CAD]  border transition">
                                   <Send size={18} />
                              </button>
                         </div>

                         <div className="flex gap-2 items-start text-sm">
                              <input type="checkbox" />
                              <p>
                                   Your email is safe with us.{" "}
                                   <span className="underline cursor-pointer">
                                        Privacy Policy
                                   </span>
                              </p>
                         </div>
                    </div>
               </div>

               {/* Bottom */}
               <div className="border-t flex flex-col md:flex-row items-center justify-between gap-4 px-6 md:px-12 py-4 text-sm text-gray-600">
                    <p>© {new Date().getFullYear()} PLANORA. All Rights Reserved.</p>

                    <div className="flex gap-3">
                         <Link href="#">Privacy Policy</Link>
                         <span>|</span>
                         <Link href="#">Terms</Link>
                    </div>
               </div>
          </footer>
     );
}