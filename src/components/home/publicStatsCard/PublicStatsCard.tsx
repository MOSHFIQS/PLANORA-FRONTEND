"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

const CountUp = dynamic(() => import("react-countup"), { ssr: false });

export type PublicStats = {
  totalActiveUsers: number;
  totalEventsDone: number;
  totalTicketsCreated: number;
  totalOrganizers: number;
  totalParticipants: number;
};

const stats = (data: PublicStats) => [
  { label: "Active Users", value: data.totalActiveUsers, suffix: "+" },
  { label: "Organizers", value: data.totalOrganizers, suffix: "+" },
  { label: "Participants", value: data.totalParticipants, suffix: "+" },
  { label: "Tickets Created", value: data.totalTicketsCreated, suffix: "+" },
];

const PublicStatsCard = ({ publicStats }: { publicStats: PublicStats }) => {
  const statItems = stats(publicStats);

  return (
    <div className="pb-5">
      <div className="relative w-full  overflow-hidden">
        {/* Background image */}
        <Image
          src="/stats.jpg"
          alt="Stats Background"
          fill
          className="object-cover"
          priority
        />

        {/* Dark overlay with subtle teal tint */}
        <div className="absolute inset-0 bg-gray-950/85" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 py-16 px-6 md:px-12">

          {/* Top label */}
          <p className="text-center text-teal-400 text-xs font-bold tracking-[0.25em] uppercase mb-10">
            Platform Overview
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
            {statItems.map((stat, i) => (
              <div key={i} className="text-center px-6 py-2 group">
                <div className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none mb-3 tabular-nums">
                  <CountUp
                    end={stat.value || 0}
                    duration={4}
                    separator=","
                    suffix={stat.suffix}
                  />
                </div>
                <div className="w-6 h-[2px] bg-teal-500 mx-auto mb-3 group-hover:w-10 transition-all duration-300" />
                <p className="text-gray-400 text-xs tracking-widest uppercase font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicStatsCard;