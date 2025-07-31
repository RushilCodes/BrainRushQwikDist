import { component$, isDev } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";

import { injectSpeedInsights } from "@vercel/speed-insights";
  injectSpeedInsights();

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */


  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:description"
          content="Sharpen your mind with quick puzzles. Try the Schulte table, number match, and more."
        />
        <meta
          property="og:image"
          content="https://ubybdwgcbacnuduecaoa.supabase.co/storage/v1/object/public/gameassets/Images/favicon.webp"
        />
        <meta property="og:url" content="https://brainrush.fun/" />
        <meta
          name="keywords"
          content="brain rush, brain training game, fast reaction game, schulte table, sudoku, number games, memory games, focus training, online mind games"
        />
        <meta property="og:title" content="Brain Rush: Fast Mind Games" />
        <meta
          property="og:description"
          content="Sharpen your mind with online focus games—the Schulte table, memory tests, and fast puzzles."
        />
        <link
          rel="preconnect"
          href="https://ubybdwgcbacnuduecaoa.supabase.co"
        />
        <title>Brain Rush - Train your brain</title>
        <link
          rel="icon"
          href="https://ubybdwgcbacnuduecaoa.supabase.co/storage/v1/object/public/gameassets/Images/favicon.webp"
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
