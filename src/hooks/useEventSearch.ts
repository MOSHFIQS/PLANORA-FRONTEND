"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export const useEventSearch = () => {
  const router = useRouter();
  const params = useSearchParams();

  const [search, setSearchState] = useState(
    params.get("search") || ""
  );

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const setSearch = (value: string) => {
    setSearchState(value);

    // clear previous timer
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const query = new URLSearchParams(params.toString());

      if (value.trim()) {
        query.set("search", value);
      } else {
        query.delete("search");
      }

      router.push(`/events?${query.toString()}`);
    }, 500);
  };

  return { search, setSearch };
};