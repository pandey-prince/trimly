"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import type { StoredUrl } from "@/lib/url-history";

interface ShortenFormProps {
  onUrlShortened: (url: StoredUrl) => void;
}

export default function ShortenForm({ onUrlShortened }: ShortenFormProps) {
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      const data = (await response.json()) as StoredUrl;
      setUrl("");
      onUrlShortened(data);
    } catch (error) {
      console.log("Error shortening Url", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="space-y-4">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="h-12"
          type="url"
          placeholder="Enter Url to shorten"
          required
        />
        <Button className="w-full p-2" type="submit" disabled={isLoading}>
          {isLoading ? "Shortening..." : "Shorten Url"}
        </Button>
      </div>
    </form>
  );
}
