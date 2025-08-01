import { component$, isDev, useVisibleTask$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";

import { injectSpeedInsights } from "@vercel/speed-insights";
import { inject } from "@vercel/analytics";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Brain Rush",
    "url": "https://brainrush.fun",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://brainrush.fun/game?game={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    injectSpeedInsights();
    inject(); // Optional: only if you're using Vercel Analytics
  });

  return (
    <QwikCityProvider>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={JSON.stringify(jsonLd)}
        />

        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:description"
          content="Sharpen your mind with quick puzzles. Try the Schulte table, number match, and more."
        />
        <meta
          property="og:image"
          content="https://brainrush.fun/favicon-128.webp"
        />
        <meta property="og:url" content="https://brainrush.fun/" />
        <meta
          name="keywords"
          content="brain rush, brain training game, fast reaction game, schulte table, sudoku, number games, memory games, focus training, online mind games"
        />
        <meta property="og:title" content="Brain Rush: Fast Mind Games" />
        <meta
          name="description"
          content="Sharpen your mind with online focus games—the Schulte table, memory tests, and fast puzzles."
        />
        <title>Brain Rush - Train your brain</title>
        <link
          rel="icon"
          href="/favicon-64.png"
        />

        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <RouterHead />
      </head>
      <body
        lang="en"
        class="flex min-h-screen flex-col bg-gray-50 font-sans text-gray-900"
      >
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
