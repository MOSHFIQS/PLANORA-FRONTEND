import Image from "next/image";
import { useState } from "react";

const fallbackImage = "/fallback.png"; // put any placeholder in public/images

export const AppImage = ({ src }: { src: string }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt="event"
      width={48}
      height={48}
      className="h-12 w-12 object-cover rounded border"
      onError={() => setImgSrc(fallbackImage)}
    />
  );
};