"use client";

import { Send } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="max-w-7xl mx-auto shadow border bg-white py-10 mb-10">
      <div className="">
        <div className="relative overflow-hidden  ">

          {/* Grid texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"

          />



          <div className="relative z-10 px-8 py-16 md:px-20 md:py-20 text-center">
            {/* Eyebrow */}
            <span className="inline-block text-teal-400 text-xs font-bold tracking-[0.25em] uppercase mb-6 border border-teal-400/30 px-4 py-1.5 rounded-full">
              Newsletter
            </span>

            <h2 className="text-4xl md:text-6xl font-black  mb-5 leading-[1.05] tracking-tight">
              Stay in the{" "}
              <span className="">Loop</span>
            </h2>

            <p className="text-gray-400 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Latest event updates, exclusive offers, and insider tips — straight to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded bg-white border  text-white placeholder:text-gray-600 focus:outline-none focus:border-teal-500/60 focus:bg-white/8 transition-all text-sm"
              />
              <button
                type="button"
                className="px-6 py-3.5 bg-orange-400 hover:bg-teal-400 text-gray-950 rounded text-white font-bold text-sm flex items-center justify-center gap-2 group transition-colors duration-200 shrink-0"
              >
                Subscribe
                <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            <p className="text-gray-600 text-xs mt-5 tracking-wide">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;