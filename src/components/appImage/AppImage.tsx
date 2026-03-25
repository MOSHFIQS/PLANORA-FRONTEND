"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

const fallbackImage = "/fallback.png";

type Props = {
  src: string;
  className?: string;
} & Omit<ImageProps, "src" | "alt">;

export const AppImage = ({
  src,
  className = "",
  ...rest
}: Props) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt="event"
      fill
      onError={() => setImgSrc(fallbackImage)}
      className={` ${className} `}
      {...rest}
    />
  );
};