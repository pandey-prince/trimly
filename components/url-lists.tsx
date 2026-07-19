"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Check, CopyIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import type { StoredUrl } from "@/lib/url-history";

type UrlListsProps = {
  urls: StoredUrl[];
  isLoading: boolean;
};

export default function UrlLists({ urls, isLoading }: UrlListsProps) {
  const [copied, setCopied] = useState(false);
  const [copyUrl, setCopyUrl] = useState("");

  const shortenrUrl = (code: string) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;

  const handleCopyUrl = (code: string) => {
    const fullUrl = shortenrUrl(code);
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setCopyUrl(code);
      setTimeout(() => {
        setCopied(false);
        setCopyUrl("");
      }, 3000);
    });
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>

        <ul className="space-y-2">
          {[1, 2, 3].map((num) => (
            <li
              key={num}
              className="flex items-center gap-2 rounded-md border bg-card p-4 text-card-foreground justify-between"
            >
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>

              <div className="flex items-center gap-3">
                <div className="h-5 w-5 bg-gray-200 rounded"></div>

                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-10 bg-gray-200 rounded"></div>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (urls.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">Your URLs</h2>
        <p className="text-muted-foreground text-sm">
          Links you shorten will show up here on this device.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Your URLs</h2>
      <ul className="space-y-2">
        {urls.map((url) => (
          <li
            key={url.id}
            className="flex items-center gap-2 justify-between bg-card rounded-md text-card-foreground border p-3"
          >
            <Link
              href={`/${url.shortCode}`}
              className="text-blue-500"
              target="_blank"
            >
              {shortenrUrl(url.shortCode)}
            </Link>
            <div className="flex justify-center items-center gap-3">
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => handleCopyUrl(url.shortCode)}
                className="text-muted-foreground hover:bg-muted"
              >
                {copied && copyUrl == url.shortCode ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <CopyIcon className="w-4 h-4" />
                )}
                <span className="sr-only">Copy Url</span>
              </Button>
              <span className="flex items-center gap-2">
                <EyeIcon className="h-4 w-4" />
                <p>{url.visits}</p>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
