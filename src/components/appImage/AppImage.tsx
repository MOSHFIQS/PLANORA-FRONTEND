"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

const fallbackImage = "/fallback.png";

type Props = {
  src?: string | null;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  loading?: "lazy" | "eager";
} & Omit<ImageProps, "src" | "alt" | "width" | "height" | "loading" | "fill">;

export const AppImage = ({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
  fill = false,
  sizes,
  loading = "lazy",
  ...rest
}: Props) => {
  const [imgSrc, setImgSrc] = useState(src || fallbackImage);

  useEffect(() => {
    setImgSrc(src || fallbackImage);
  }, [src]);

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt || "image"}
        fill
        sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"}
        onError={() => setImgSrc(fallbackImage)}
        className={className}
        priority={priority}
        loading={loading}
        {...rest}
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt || "image"}
      width={width || 500}
      height={height || 300}
      onError={() => setImgSrc(fallbackImage)}
      className={className}
      priority={priority}
      loading={loading}
      {...rest}
    />
  );
};
