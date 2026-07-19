"use client";
import { useEffect, useState } from "react";
import ShortenForm from "./shorten-form";
import UrlLists from "./url-lists";
import {
  addStoredUrl,
  getStoredUrls,
  syncStoredUrlVisits,
  type StoredUrl,
} from "@/lib/url-history";

export default function UrlShortenerContainer() {
  const [urls, setUrls] = useState<StoredUrl[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredUrls();
    setUrls(stored);

    if (stored.length === 0) {
      setIsLoading(false);
      return;
    }

    const refreshVisits = async () => {
      try {
        const codes = stored.map((url) => url.shortCode).join(",");
        const response = await fetch(`/api/urls?codes=${encodeURIComponent(codes)}`);
        if (!response.ok) return;

        const data = (await response.json()) as StoredUrl[];
        if (!Array.isArray(data) || data.length === 0) return;

        setUrls(syncStoredUrlVisits(data));
      } catch (error) {
        console.error("Error refreshing URL visits", error);
      } finally {
        setIsLoading(false);
      }
    };

    void refreshVisits();
  }, []);

  const handleUrlShortened = (url: StoredUrl) => {
    setUrls(addStoredUrl(url));
  };

  return (
    <div>
      <ShortenForm onUrlShortened={handleUrlShortened} />
      <UrlLists urls={urls} isLoading={isLoading} />
    </div>
  );
}
