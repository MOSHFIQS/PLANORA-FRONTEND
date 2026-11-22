"use client";

import { AppImage } from "@/components/appImage/AppImage";
import { useState, useEffect } from "react";

interface Props {
  images: string[] | string;
  zoom?: number;
}

export default function ImageMagnifier({ images, zoom = 1.05 }: Props) {
  const rawList = (Array.isArray(images) ? images : [images]).filter(Boolean);
  const [galleryImages, setGalleryImages] = useState<string[]>(rawList);
  const [isHovering, setIsHovering] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    setGalleryImages(rawList);
  }, [JSON.stringify(rawList)]);

  if (!galleryImages.length) return null;

  const mainImage = galleryImages[0];
  const sideImages = galleryImages.slice(1, 5); // up to 4 images for the right 2x2 grid
  const remainingCount = galleryImages.length - 5;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector("img.hero-gallery-img") as HTMLImageElement | null;
    if (!img) return;
    const { left, top, width, height } = img.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleSwapWithHero = (sideIndex: number) => {
    const targetIndex = sideIndex + 1; // index in galleryImages
    if (!galleryImages[targetIndex]) return;

    setIsFading(true);
    setTimeout(() => {
      setGalleryImages((prev) => {
        const next = [...prev];
        const currentHero = next[0];
        next[0] = next[targetIndex];
        next[targetIndex] = currentHero;
        return next;
      });
      setIsFading(false);
    }, 150);
  };

  return (
    <div className="w-full select-none block overflow-hidden rounded-xl">
      {/* ── Single Image View ───────────────────────────────────────────── */}
      {galleryImages.length === 1 && (
        <div
          className="w-full relative h-[320px] sm:h-[420px] md:h-[480px] lg:h-[500px] rounded-xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100 group"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <AppImage
            src={mainImage}
            alt="Event banner"
            fill
            priority
            className="hero-gallery-img object-cover transition-transform duration-300"
            style={{
              transform: isHovering ? `scale(${zoom})` : "scale(1)",
            }}
          />
        </div>
      )}

      {/* ── 2 Images View ──────────────────────────────────────────────── */}
      {galleryImages.length === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 h-[320px] sm:h-[420px] md:h-[480px] lg:h-[500px] w-full">
          {/* Hero Left */}
          <div
            className="md:col-span-8 h-full relative rounded-xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100 cursor-pointer min-h-0"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <AppImage
              src={mainImage}
              alt="Event banner"
              fill
              priority
              className={`hero-gallery-img object-cover transition-all duration-200 ${
                isFading ? "opacity-30 scale-98" : "opacity-100 scale-100"
              }`}
              style={{
                transform: isHovering ? `scale(${zoom})` : undefined,
              }}
            />
          </div>

          {/* Secondary Right */}
          <div
            onClick={() => handleSwapWithHero(0)}
            className="md:col-span-4 h-full relative rounded-xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100 cursor-pointer group hover:ring-2 hover:ring-[#4F46E5]/60 transition-all min-h-0"
            title="Click to view as main banner"
          >
            <AppImage
              src={sideImages[0]}
              alt="Event photo 2"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none" />
          </div>
        </div>
      )}

      {/* ── 3 Images View ──────────────────────────────────────────────── */}
      {galleryImages.length === 3 && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 h-[340px] sm:h-[440px] md:h-[480px] lg:h-[500px] w-full">
          {/* Hero Left */}
          <div
            className="md:col-span-7 lg:col-span-8 h-full relative rounded-xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100 min-h-0"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <AppImage
              src={mainImage}
              alt="Event hero"
              fill
              priority
              className={`hero-gallery-img object-cover transition-all duration-200 ${
                isFading ? "opacity-30 scale-98" : "opacity-100 scale-100"
              }`}
              style={{
                transform: isHovering ? `scale(${zoom})` : undefined,
              }}
            />
          </div>

          {/* Right Stack (2 images) */}
          <div className="md:col-span-5 lg:col-span-4 grid grid-rows-2 gap-3 sm:gap-4 h-full min-h-0">
            {sideImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => handleSwapWithHero(idx)}
                className="relative h-full w-full rounded-xl overflow-hidden border border-slate-200/90 shadow-xs cursor-pointer group hover:ring-2 hover:ring-[#4F46E5]/60 transition-all bg-slate-100 min-h-0"
                title="Click to switch with main image"
              >
                <AppImage
                  src={img}
                  alt={`Gallery photo ${idx + 2}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 4+ Images Grid (1 Hero Left + 4 Images in 2x2 Grid Right) ────── */}
      {galleryImages.length >= 4 && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 h-[380px] sm:h-[440px] md:h-[480px] lg:h-[520px] w-full">
          {/* Left Large Hero Image (~58% width: 7 cols) */}
          <div
            className="md:col-span-7 h-full relative rounded-xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-100 min-h-0"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <AppImage
              src={mainImage}
              alt="Main Event Banner"
              fill
              priority
              className={`hero-gallery-img object-cover transition-all duration-200 ${
                isFading ? "opacity-30 scale-98" : "opacity-100 scale-100"
              }`}
              style={{
                transform: isHovering ? `scale(${zoom})` : undefined,
              }}
            />
          </div>

          {/* Right 2x2 Grid of 4 Images (~42% width: 5 cols) */}
          <div className="md:col-span-5 grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4 h-full w-full min-h-0">
            {sideImages.map((img, idx) => {
              const isLastBoxWithMore = idx === 3 && remainingCount > 0;

              return (
                <div
                  key={idx}
                  onClick={() => handleSwapWithHero(idx)}
                  className="relative h-full w-full rounded-xl overflow-hidden border border-slate-200/90 shadow-xs cursor-pointer group hover:ring-2 hover:ring-[#4F46E5]/60 transition-all bg-slate-100 min-h-0"
                  title="Click to view as main banner"
                >
                  <AppImage
                    src={img}
                    alt={`Event photo ${idx + 2}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none" />

                  {/* If more than 5 images, show counter badge overlay on the 4th thumbnail */}
                  {isLastBoxWithMore && (
                    <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px] flex items-center justify-center text-white font-bold text-base sm:text-lg group-hover:bg-black/40 transition-colors pointer-events-none">
                      +{remainingCount} more
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
