"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useEventSearch = () => {
  const router = useRouter();
  const params = useSearchParams();

  const initialSearch = params.get("search") || "";

  const [search, setSearchState] = useState(initialSearch);

  // debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      const query = new URLSearchParams(params.toString());

      if (search.trim()) {
        query.set("search", search);
      } else {
        query.delete("search");
      }

      router.push(`/events?${query.toString()}`);
    }, 500); // 500ms delay

    return () => clearTimeout(handler);
  }, [search]);

  // exposed setter
  const setSearch = (value: string) => {
    setSearchState(value);
  };

  return { search, setSearch };
};