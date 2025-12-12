import UrlShortenerContainer from "@/components/url-shortener-container";

export default function Home() {
  return (
    <main className="mx-auto max-w-xl py-6 md:py-12 space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Url Shortener</h1>
        <p className="md:text-lg">Shorten your URLs and share them easily.</p>
      </div>
      <UrlShortenerContainer />
    </main>
  );
}
