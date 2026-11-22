"use client";

import SectionHeader from "@/components/shared/sectionHeader/SectionHeader";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Category = {
  id: string;
  name: string;
  image: string;
};

const CategoryCard = ({ categories }: { categories: Category[] }) => {
  const router = useRouter();
  const limitedCategories = categories?.slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto">
      <SectionHeader
        align="center"
        title="Events By Category"
        description="Discover events based on your interests and join amazing experiences."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
        {limitedCategories?.map((category) => {
          return (
            <div
              key={category.id}
              onClick={() => router.push(`/events?categoryId=${category.id}`)}
              className="relative h-44 overflow-hidden rounded-md border border-slate-200/80 cursor-pointer group shadow-2xs hover:shadow-md transition-all duration-300"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-108"
              />

              {/* Sophisticated dark slate to indigo brand gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/45 to-transparent group-hover:from-indigo-950/90 group-hover:via-indigo-950/50 group-hover:to-indigo-900/20 transition-all duration-300" />

              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <h3 className="text-white text-base md:text-lg font-bold group-hover:text-indigo-200 transition-colors drop-shadow-xs">
                  {category.name}
                </h3>
                <span className="text-[11px] font-medium text-slate-300 group-hover:text-white mt-0.5 inline-flex items-center gap-1 transition-colors">
                  Explore events →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryCard;
