"use client";

import { Send } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="max-w-7xl mx-auto rounded-md shadow-2xs border border-slate-200 bg-white py-10 mb-10">
      <div className="relative overflow-hidden">
        <div className="relative z-10 px-8 py-14 md:px-20 md:py-16 text-center">
          {/* Eyebrow */}
          <span className="inline-block text-indigo-600 text-xs font-bold tracking-[0.25em] uppercase mb-5 border border-indigo-200 bg-indigo-50/60 px-4 py-1.5 rounded-md">
            Newsletter
          </span>

          <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight tracking-tight text-slate-900">
            Stay in the <span className="text-[#4F46E5]">Loop</span>
          </h2>

          <p className="text-slate-500 text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Latest event updates, exclusive offers, and insider tips — straight to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-md bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-sm"
            />
            <button
              type="button"
              className="px-6 py-3 bg-[#4F46E5] hover:bg-indigo-600 text-white rounded-md font-bold text-sm flex items-center justify-center gap-2 group transition-colors duration-200 shrink-0 shadow-sm"
            >
              Subscribe
              <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          <p className="text-slate-400 text-xs mt-4 tracking-wide">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
