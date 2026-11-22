"use client";

import { AppImage } from "@/components/appImage/AppImage";
import { useState } from "react";

interface Props {
  images: string[] | string;
  zoom?: number;
}

export default function ImageMagnifier({ images, zoom = 1.08 }: Props) {
  const imageArray = (Array.isArray(images) ? images : [images]).filter(Boolean);
  const [mainImage, setMainImage] = useState(imageArray?.[0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [imageOpacity, setImageOpacity] = useState(1);

  if (!imageArray?.length) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector("img.main-event-image") as HTMLImageElement | null;
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
      {/* Main Banner Showcase Container */}
      <div
        className="w-full relative rounded-3xl overflow-hidden h-[360px] sm:h-[440px] md:h-[480px] border border-slate-200/80 shadow-md flex items-center justify-center bg-slate-900 group"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseLeave={() => setShowMagnifier(false)}
      >
        {/* Ambient vibrant blurred backdrop of the current photo */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-2xl opacity-60 scale-125 saturate-150 transition-all duration-300 pointer-events-none"
          style={{ backgroundImage: `url(${mainImage})` }}
        />
        {/* Subtle glass vignette overlay */}
        <div className="absolute inset-0 bg-black/25 backdrop-blur-sm pointer-events-none" />

        {/* Crisp foreground banner */}
        <div className="relative z-10 w-full h-full flex items-center justify-center p-2 sm:p-4">
          <AppImage
            src={mainImage}
            alt="Event banner"
            width={1920}
            height={1080}
            className="main-event-image max-w-full max-h-full object-contain rounded-2xl shadow-2xl transition-transform duration-200 select-none"
            style={{
              transform: showMagnifier ? `scale(${zoom})` : "scale(1)",
              transition: "transform 0.2s ease, opacity 0.15s ease",
              opacity: imageOpacity,
            }}
            priority
            loading="eager"
          />
        </div>
      </div>

      {/* Thumbnails */}
      {imageArray.length > 1 && (
        <div className="flex gap-2.5 flex-wrap items-center justify-start pt-1">
          {imageArray.map((img, i) => (
            <button
              key={i}
              type="button"
              className={`w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 bg-slate-900 flex-shrink-0 ${
                mainImage === img
                  ? "border-[#725CAD] ring-2 ring-[#725CAD]/30 scale-105 shadow-md"
                  : "border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100"
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
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
