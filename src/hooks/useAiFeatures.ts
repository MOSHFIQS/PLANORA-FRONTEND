import { apiFetchClient } from "@/lib/apiFetchClient";
import { useState, useEffect, useMemo } from "react";

type AIEvent = {
  id: string;
  title: string;
  description: string;
  venue?: string;
  dateTime: string;
  type: string;
  visibility: string;
  fee: number;
  images: string[];
  categoryId?: string;
  isFeatured: boolean;
  meetingLink?: string;
  trendingScore?: number;
};

export function useAIFeatures() {
  const [allEvents, setAllEvents] = useState<AIEvent[]>([]);
  const [searchResults, setSearchResults] = useState<AIEvent[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const userInterests = ["music", "tech", "food", "workshop", "online", "networking"];

  // Fetch ALL events with high limit to bypass default pagination
  useEffect(() => {
    async function loadData() {
      try {
        const res = await apiFetchClient("/event?limit=100&page=1");
        if (res.ok && res.data) {
          const dataPayload = res.data?.data;
          const eventArray = Array.isArray(dataPayload)
            ? dataPayload
            : Array.isArray(dataPayload?.data)
            ? dataPayload.data
            : [];
          setAllEvents(eventArray);
        }
      } catch (e) {
        console.error("AI Feature data load failed", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Search via API with debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const controller = new AbortController();

    async function fetchSearch() {
      setSearchLoading(true);
      try {
        const res = await apiFetchClient(
          `/event?searchTerm=${encodeURIComponent(searchQuery.trim())}&limit=5`
        );
        if (res.ok && res.data) {
          const dataPayload = res.data?.data;
          const eventArray = Array.isArray(dataPayload)
            ? dataPayload
            : Array.isArray(dataPayload?.data)
            ? dataPayload.data
            : [];
          setSearchResults(eventArray.slice(0, 5));
        }
      } catch (e) {
        if (!controller.signal.aborted) console.error("Search failed", e);
      } finally {
        if (!controller.signal.aborted) setSearchLoading(false);
      }
    }

    const timer = setTimeout(fetchSearch, 400);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchQuery]);

  // Personalized Recommendations — filter future events matching interests
  const personalizedRecommendations = useMemo(() => {
    if (!allEvents.length) return [];
    return allEvents
      .filter(
        (event) =>
          new Date(event.dateTime) > new Date() &&
          userInterests.some(
            (interest) =>
              event.title.toLowerCase().includes(interest) ||
              event.description?.toLowerCase().includes(interest) ||
              event.type?.toLowerCase().includes(interest)
          )
      )
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  }, [allEvents]);

  // Trending — future events scored by featured + free + random engagement
  const trendingItems = useMemo(() => {
    if (!allEvents.length) return [];
    return [...allEvents]
      .filter((e) => new Date(e.dateTime) > new Date())
      .map((event) => ({
        ...event,
        trendingScore:
          Math.floor(Math.random() * 900) +
          100 +
          (event.isFeatured ? 500 : 0) +
          (event.fee === 0 ? 200 : 0),
      }))
      .sort((a, b) => b.trendingScore! - a.trendingScore!)
      .slice(0, 4);
  }, [allEvents]);

  return {
    events: allEvents,
    loading,
    searchQuery,
    setSearchQuery,
    searchResults,
    searchLoading,
    personalizedRecommendations,
    trendingItems,
  };
}