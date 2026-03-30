"use client";

import SectionHeader from "@/components/sectionHeader/SectionHeader";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Category = {
  id: string;
  name: string;
  image: string;
};

const colors = [
  { base: "bg-red-500/50", hover: "group-hover:bg-red-200/30" },
  { base: "bg-blue-500/50", hover: "group-hover:bg-blue-200/30" },
  { base: "bg-green-500/50", hover: "group-hover:bg-green-200/30" },
  { base: "bg-yellow-500/50", hover: "group-hover:bg-yellow-200/30" },
  { base: "bg-purple-500/50", hover: "group-hover:bg-purple-200/30" },
  { base: "bg-pink-500/50", hover: "group-hover:bg-pink-200/30" },
  { base: "bg-indigo-500/50", hover: "group-hover:bg-indigo-200/30" },
  { base: "bg-orange-500/50", hover: "group-hover:bg-orange-200/30" },
];

const CategoryCard = ({ categories }: { categories: Category[] }) => {
  const router = useRouter();
  const limitedCategories = categories?.slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <SectionHeader
        align="center"
        title="Events By Category"
        description="Discover events based on your interests and join amazing experiences."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {limitedCategories?.map((category, index) => {
          const color = colors[index % colors.length];

          return (
            <div
              key={category.id}
              onClick={() => router.push(`/events?categoryId=${category.id}`)}
              className="relative h-40 overflow-hidden rounded-lg cursor-pointer group"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
              />

              <div className={`absolute inset-0 ${color.base} ${color.hover} transition duration-300`} />

              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-lg font-semibold text-center px-2">
                  {category.name}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default CategoryCard;