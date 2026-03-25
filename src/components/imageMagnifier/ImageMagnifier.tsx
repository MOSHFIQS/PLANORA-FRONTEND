"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import { AppImage } from "../appImage/AppImage";

interface Props {
  images: string[] | string;
  zoom?: number;
}

export default function ImageMagnifier({ images, zoom = 1.1 }: Props) {
  const imageArray = Array.isArray(images) ? images : [images];
  const [mainImage, setMainImage] = useState(imageArray?.[0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [imageOpacity, setImageOpacity] = useState(1);

  if (!imageArray?.length) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector("img")!;
    const { left, top, width, height } = img.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    img.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleChangeImage = (img: string) => {
    if (img === mainImage) return;
    setImageOpacity(0); // fade out
    setTimeout(() => {
      setMainImage(img); // switch image
      setImageOpacity(1); // fade in
    }, 200); // fade duration
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <Card
        className="w-full h-140 rounded-lg overflow-hidden relative"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseLeave={() => setShowMagnifier(false)}
      >
        <AppImage
          src={mainImage}
          alt="Product"
          width={800} // set default width
          height={500} // set default height
          className="object-cover transition-all duration-100 w-full h-full"
          style={{
            transform: showMagnifier ? `scale(${zoom})` : "scale(1)",
            transition: "transform 0.2s ease, opacity 0.2s ease",
            opacity: imageOpacity,
          }}
          priority 
          loading={"eager"}
        />
      </Card>

      {/* Thumbnails */}
      <div className="flex gap-2 flex-wrap items-center justify-center">
        {imageArray?.length > 1 &&
          imageArray.map((img, i) => (
            <div
              key={i}
              className={`w-20 h-20 border shadow rounded cursor-pointer overflow-hidden ${
                mainImage === img ? "border-blue-500" : "border-gray-200"
              }`}
              onClick={() => handleChangeImage(img)}
            >
              <AppImage
                src={img}
                alt={`Product thumbnail ${i}`}
                width={80}
                height={80}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
      </div>
    </div>
  );
}