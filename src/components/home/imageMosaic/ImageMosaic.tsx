"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import SectionHeader from "@/components/shared/sectionHeader/SectionHeader";

type Props = {
  images: string[]; // 3 images
};

const ImageMosaic = ({ images }: Props) => {
  return (
    <section className="px-6  overflow-hidden">
      <SectionHeader
        align="center"
        title="Moments That Matter"
        description="A curated visual experience capturing events, people, and energy"
      />
      <div className="max-w-6xl mx-auto relative">

        {/* Background glow */}
        {/* <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-300/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-300/20 blur-3xl rounded-full" /> */}



        {/* Mosaic Layout */}
        <div className="relative flex justify-center items-center h-[500px]">

          {/* Left Image */}
          <Card className="absolute left-0 top-10 w-[260px] h-[320px] overflow-hidden rounded-2xl shadow-xl rotate-[-6deg] hover:rotate-0 transition-transform duration-500 group">
            <Image
              src={images[0]}
              alt="img1"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30" />
          </Card>

          {/* Center Image (Main) */}
          <Card className="relative z-10 w-[320px] h-[400px] overflow-hidden rounded-3xl shadow-2xl group">
            <Image
              src={images[1]}
              alt="img2"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            <div className="absolute bottom-5 left-5 text-white">
              <h3 className="text-lg font-semibold">Featured Experience</h3>
              <p className="text-sm text-gray-200">
                Explore the best moments
              </p>
            </div>
          </Card>

          {/* Right Image */}
          <Card className="absolute right-0 bottom-10 w-[260px] h-[320px] overflow-hidden rounded-2xl shadow-xl rotate-[6deg] hover:rotate-0 transition-transform duration-500 group">
            <Image
              src={images[2]}
              alt="img3"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30" />
          </Card>

        </div>
      </div>
    </section>
  );
};

export default ImageMosaic;