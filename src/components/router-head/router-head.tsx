import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";
import { TotalPlaytimePopup } from "../PlayTimeTracker";
// import Favicon from '~/assets/favicon.png'
// import Favicon16 from '~/assets/favicon.png?w=16&h=16&jsx'
// import Favicon32 from '~/assets/favicon.png?w=32&h=32&jsx'
// import Favicon64 from '~/assets/favicon.png?w=64&h=64&jsx'

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <TotalPlaytimePopup />

      <title>{head.title ?? "Play Brain Games Online | Weekly Memory & Logic Puzzles"}</title>

      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <link rel="preconnect" href="https://statistics.brainrush.fun" />
      <meta
        name="description"
        content="Play free brain games online to boost memory, concentration, logic, and problem-solving. New challenges every week. Schulte table, memory tests, and more!"
      />
      <meta
        name="keywords"
        content="brain games, brain training, memory games, logic puzzles, focus games, IQ tests, Schulte table, free brain games, online brain training, number games, cognitive games, mental workout"
      />
      <meta name="author" content="Brain Rush" />
      <meta
        property="og:title"
        content="Brain Rush | Train Your Brain Online"
      />
      <meta
        property="og:description"
        content="Sharpen your mind with free brain games, logic puzzles, and weekly challenges. Play Schulte tables, memory matches, and focus games online."
      />
      <meta property="og:image" content="https://brainrush.fun/favicon.png" />
      <meta property="og:url" content="https://brainrush.fun/" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Brain Rush | Boost Your Brainpower" />
      <meta
        name="twitter:description"
        content="Free online brain training games. Improve memory, focus, logic, and reflexes with weekly updated games."
      />
      <meta name="twitter:image" content="https://brainrush.fun/favicon.png" />
      <link
        rel="icon"
        type="image/png"
        href="/favicon-96x96.png"
        sizes="96x96"
      />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <meta name="apple-mobile-web-app-title" content="Brain Rush" />

      <link rel="manifest" href="/manifest.json" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Brain Rush",
          url: "https://brainrush.fun",
          description:
            "Play free brain games online to boost memory, concentration, logic, and problem-solving. New challenges every week.",
        })}
      />
      <script
          defer
          type="text/partytown"
          src="https://statistics.brainrush.fun/script.js"
          data-website-id="9e4887af-5051-4847-8748-f5019f789f05"
        />
      <title>Brain Rush - Free Brain Games & Weekly Challenges</title>

      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}
    </>
  );
});
