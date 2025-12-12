"use client";
import { useState } from "react";
import ShortenForm from "./shorten-form";
import UrlLists from "./url-lists";
export default function UrlShortenerContainer() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUrlShortened = () => {
    setRefreshKey((prev) => prev + 1);
  };
return (
    <div>
      <ShortenForm handleUrlShortened={handleUrlShortened} />
      <UrlLists key={refreshKey} />
    </div>
  );
}
