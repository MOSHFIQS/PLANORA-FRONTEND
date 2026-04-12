"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function GlobalSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);

      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      params.set("page", "1");

      router.push(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, router]);

  return (
    <div className="w-full max-w-sm">
      <Input
        value={search}
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        className="h-8 text-sm rounded-md border bg-[#eef0ff] dark:bg-[#1f1f23]"
      />
    </div>
  );
}