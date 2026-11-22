"use client";

import { AppImage } from "@/components/appImage/AppImage";
import { useState } from "react";

interface Props {
  images: string[] | string;
  zoom?: number;
}

export default function ImageMagnifier({ images, zoom = 1.05 }: Props) {
  const imageArray = (Array.isArray(images) ? images : [images]).filter(Boolean);
  const [mainImage, setMainImage] = useState(imageArray?.[0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [imageOpacity, setImageOpacity] = useState(1);

  if (!imageArray?.length) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector("img");
    if (!img) return;
    const { left, top, width, height } = img.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    img.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleChangeImage = (img: string) => {
    if (img === mainImage) return;
    setImageOpacity(0);
    setTimeout(() => {
      setMainImage(img);
      setImageOpacity(1);
    }, 150);
  };

  return (
    <div className="space-y-4 w-full">
      {/* Main Banner Image Container */}
      <div
        className="w-full relative rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center aspect-[16/9] max-h-[500px] border border-slate-200/60 shadow-sm"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseLeave={() => setShowMagnifier(false)}
      >
        {/* Ambient blurred backdrop for letterboxing */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-3xl opacity-25 scale-110 pointer-events-none"
          style={{ backgroundImage: `url(${mainImage})` }}
        />

        {/* Sharp foreground banner maintaining native aspect ratio */}
        <AppImage
          src={mainImage}
          alt="Event banner"
          width={1920}
          height={1080}
          className="relative z-10 w-full h-full object-contain transition-transform duration-200 select-none"
          style={{
            transform: showMagnifier ? `scale(${zoom})` : "scale(1)",
            transition: "transform 0.2s ease, opacity 0.15s ease",
            opacity: imageOpacity,
          }}
          priority
          loading="eager"
        />
      </div>

      {/* Thumbnails */}
      {imageArray.length > 1 && (
        <div className="flex gap-2.5 flex-wrap items-center justify-center pt-1">
          {imageArray.map((img, i) => (
            <div
              key={i}
              className={`w-24 h-16 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 bg-slate-900 ${
                mainImage === img
                  ? "border-[#725CAD] ring-2 ring-[#725CAD]/30 scale-105 shadow-md"
                  : "border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100"
              }`}
              onClick={() => handleChangeImage(img)}
            >
              <AppImage
                src={img}
                alt={`Banner thumbnail ${i + 1}`}
                width={200}
                height={120}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
