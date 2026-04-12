"use client";

import SectionHeader from "@/components/shared/sectionHeader/SectionHeader";
import {
  Ticket,
  BarChart2,
  ShieldCheck,
  Palette,
  ScanLine,
  HeadphonesIcon,
} from "lucide-react";

const features = [
  {
    icon: Ticket,
    title: "Seamless Ticketing",
    description:
      "Create and sell tickets with ease using our robust ticketing engine.",
    accent: "#3B82F6",
    number: "01",
  },
  {
    icon: BarChart2,
    title: "Real-Time Analytics",
    description:
      "Track sales, attendance, and audience insights in real-time.",
    accent: "#8B5CF6",
    number: "02",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description:
      "Accept payments securely from anywhere in the world.",
    accent: "#10B981",
    number: "03",
  },
  {
    icon: Palette,
    title: "Custom Event Pages",
    description:
      "Design stunning event pages that capture your brand's unique identity.",
    accent: "#F59E0B",
    number: "04",
  },
  {
    icon: ScanLine,
    title: "Easy Check-in",
    description:
      "Scan QR codes and check-in attendees seamlessly at the door.",
    accent: "#EF4444",
    number: "05",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description:
      "Our dedicated support team is always here to help you succeed.",
    accent: "#06B6D4",
    number: "06",
  },
];

const Features = () => {
  return (
    <section className="py-20 relative overflow-hidden">

      {/* subtle grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px,transparent 1px),linear-gradient(90deg,currentColor 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          align="center"
          title="Why Choose PLANORA"
          description="Everything you need to plan, promote, and host unforgettable events, all in one intuitive platform."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 mt-14">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="
                  group relative bg-white dark:bg-gray-900
                  p-8 flex flex-col gap-5 cursor-default
                  transition-all duration-300
                  hover:z-10
                "
                style={
                  {
                    "--accent": feature.accent,
                  } as React.CSSProperties
                }
              >
                {/* sliding accent bar — left edge */}
                <span
                  className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full scale-y-0 origin-center transition-transform duration-300 ease-out group-hover:scale-y-100"
                  style={{ background: feature.accent }}
                />

                {/* faint number watermark */}
                <span
                  className="absolute top-4 right-5 text-6xl font-black leading-none select-none
                    text-gray-100 dark:text-gray-800 transition-all duration-300
                    group-hover:text-[var(--accent)] group-hover:opacity-10"
                >
                  {feature.number}
                </span>

                {/* icon */}
                <div
                  className="relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300
                    border border-gray-200 dark:border-gray-700
                    group-hover:border-transparent group-hover:shadow-lg"
                  style={
                    {
                      boxShadow: "none",
                    } as React.CSSProperties
                  }
                >
                  {/* icon bg fill on hover via inline style trick */}
                  <span
                    className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-15"
                    style={{ background: feature.accent }}
                  />
                  <Icon
                    className="w-5 h-5 relative z-10 text-gray-400 dark:text-gray-500 transition-all duration-300 group-hover:scale-110"
                    style={
                      {
                        "--tw-text-opacity": 1,
                      } as React.CSSProperties
                    }
                  // swap color via parent group
                  />
                  {/* colored icon overlay on hover */}
                  <Icon
                    className="absolute inset-0 m-auto w-5 h-5 z-10 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
                    style={{ color: feature.accent }}
                  />
                </div>

                {/* text */}
                <div className="flex flex-col gap-2">
                  <h3
                    className="text-[15px] font-semibold text-gray-900 dark:text-white tracking-tight
                      transition-colors duration-300"
                    style={
                      {
                        // title turns accent on hover via group trick below
                      }
                    }
                  >
                    <span className="group-hover:hidden">{feature.title}</span>
                    <span
                      className="hidden group-hover:inline"
                      style={{ color: feature.accent }}
                    >
                      {feature.title}
                    </span>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* bottom arrow link indicator */}
                <div className="mt-auto flex items-center gap-1.5 text-xs font-medium text-gray-300 dark:text-gray-600 overflow-hidden">
                  <span
                    className="-translate-x-10 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                    style={{ color: feature.accent }}
                  >
                    Explore feature
                  </span>
                  <svg
                    className="-translate-x-10 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 w-3.5 h-3.5"
                    style={{ color: feature.accent, transitionDelay: "40ms" }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;