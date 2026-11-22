"use client";

import BannerForm from "../BannerForm";

export default function UpdateBanner({ banner }: { banner: any }) {
  return <BannerForm mode="update" banner={banner} />;
}
