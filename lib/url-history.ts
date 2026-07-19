export type StoredUrl = {
  id: string;
  shortCode: string;
  originalUrl: string;
  visits: number;
};

const STORAGE_KEY = "trimly-my-urls";
const MAX_STORED_URLS = 50;

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getStoredUrls(): StoredUrl[] {
  if (!canUseStorage()) return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isStoredUrl);
  } catch {
    return [];
  }
}

export function addStoredUrl(url: StoredUrl): StoredUrl[] {
  const existing = getStoredUrls().filter((item) => item.shortCode !== url.shortCode);
  const next = [url, ...existing].slice(0, MAX_STORED_URLS);
  persist(next);
  return next;
}

export function syncStoredUrlVisits(urls: StoredUrl[]): StoredUrl[] {
  const byCode = new Map(urls.map((url) => [url.shortCode, url]));
  const next = getStoredUrls().map((stored) => {
    const fresh = byCode.get(stored.shortCode);
    if (!fresh) return stored;
    return {
      ...stored,
      visits: fresh.visits,
      originalUrl: fresh.originalUrl,
      id: fresh.id,
    };
  });
  persist(next);
  return next;
}

function persist(urls: StoredUrl[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
}

function isStoredUrl(value: unknown): value is StoredUrl {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.shortCode === "string" &&
    typeof candidate.originalUrl === "string" &&
    typeof candidate.visits === "number"
  );
}
