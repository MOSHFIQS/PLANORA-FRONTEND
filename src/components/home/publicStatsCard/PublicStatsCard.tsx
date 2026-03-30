"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

const CountUp = dynamic(() => import("react-countup"), { ssr: false });

type PublicStats = {
  totalActiveUsers: number;
  totalEventsDone: number;
  totalTicketsCreated: number;
  totalOrganizers: number;
  totalParticipants: number;
};

const PublicStatsCard = ({ publicStats }: { publicStats: PublicStats }) => {
  return (
    <div className="pb-5">
      {/* <SectionHeader
        align="center"
        title="Events By Category"
        description="Discover events based on your interests and join amazing experiences."
      /> */}
      <div className="relative w-full h-[320px] overflow-hidden ">

        {/* Background Image */}
        <Image
          src="/stats.jpg"
          alt="Stats Background"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#202022d5] flex items-center justify-center">

          <div className="grid grid-cols-4 gap-16 text-center text-white px-10 w-full max-w-5xl">

            {/* Card 1 */}
            <div className="space-y-3">
              <h2 className="text-6xl font-extrabold tracking-wide">
                <CountUp end={publicStats?.totalActiveUsers  || 0} duration={5} />
              </h2>
              <p className="text-sm md:text-base text-gray-300">
                Active Users
              </p>
            </div>

            {/* Card 2 */}
            <div className="space-y-3">
              <h2 className="text-6xl font-extrabold tracking-wide">
                <CountUp end={publicStats?.totalOrganizers || 0} duration={5} />
              </h2>
              <p className="text-sm md:text-base text-gray-300">
                Organizers
              </p>
            </div>
            <div className="space-y-3">
              <h2 className="text-6xl font-extrabold tracking-wide">
                <CountUp end={publicStats?.totalParticipants || 0} duration={5} />
              </h2>
              <p className="text-sm md:text-base text-gray-300">
                Participants
              </p>
            </div>

            {/* Card 3 */}
            <div className="space-y-3">
              <h2 className="text-6xl font-extrabold tracking-wide">
                <CountUp end={publicStats?.totalTicketsCreated || 0} duration={5} />
              </h2>
              <p className="text-sm md:text-base text-gray-300">
                Tickets Created
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default PublicStatsCard;