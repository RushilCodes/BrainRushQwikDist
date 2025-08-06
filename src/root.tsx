/* eslint-disable qwik/no-use-visible-task */
import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";

import { injectSpeedInsights } from "@vercel/speed-insights";
import { inject } from "@vercel/analytics";
import { TotalPlaytimePopup } from "./components/PlayTimeTracker/PlayTimeTracker";
import { QwikPartytown } from "./components/partytown/partytown";

export const LazyAdsenseScript = component$(() => {
  useVisibleTask$(() => {
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2768888723094918",
    );
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  });

  return null;
});

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  useVisibleTask$(() => {
    injectSpeedInsights();
    inject(); // Optional: only if you're using Vercel Analytics
  });

  return (
    <QwikCityProvider>
      <TotalPlaytimePopup />
      <head>
        <QwikPartytown forward={["fetch"]} />
        <link rel="preconnect" href="https://statistics.brainrush.fun" />

        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
        <meta
          property="og:image"
          content="https://brainrush.fun/favicon.webp"
        />
        <meta property="og:url" content="https://brainrush.fun/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Brain Rush | Boost Your Brainpower"
        />
        <meta
          name="twitter:description"
          content="Free online brain training games. Improve memory, focus, logic, and reflexes with weekly updated games."
        />
        <meta
          name="twitter:image"
          content="https://brainrush.fun/favicon.webp"
        />
        <link rel="canonical" href="https://brainrush.fun/" />
        <link
          rel="icon"
          type="image/png"
          sizes="64x64"
          href="/favicon-64.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16.png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

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
          src="https://statistics.brainrush.fun/script.js"
          data-website-id="9e4887af-5051-4847-8748-f5019f789f05"
        />
        <title>Brain Rush - Free Brain Games & Weekly Challenges</title>
        <RouterHead />
      </head>

      <body
        lang="en"
        class="flex min-h-screen flex-col bg-gray-50 font-sans text-gray-900"
      >
        <RouterOutlet />
        <LazyAdsenseScript />
      </body>
    </QwikCityProvider>
  );
});
