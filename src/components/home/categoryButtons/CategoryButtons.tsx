"use client";

import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
};

export default function CategoryButtons({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryFromUrl = searchParams.get("categoryId") || "ALL";
  const [activeCategory, setActiveCategory] = useState("ALL");

  useEffect(() => {
    setActiveCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("search");
    params.delete("page");

    if (categoryId === "ALL") {
      params.delete("categoryId");
    } else {
      params.set("categoryId", categoryId);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={activeCategory === "ALL" ? "orange" : "outline"}
        onClick={() => handleCategoryChange("ALL")}
        className="rounded-full"
      >
        All
      </Button>

      {categories.map((cat) => (
        <Button
          className="rounded-full"
          key={cat.id}
          variant={activeCategory === cat.id ? "orange" : "outline"}
          onClick={() => handleCategoryChange(cat.id)}
        >
          {cat.name}
        </Button>
      ))}
    </div>
  );
}