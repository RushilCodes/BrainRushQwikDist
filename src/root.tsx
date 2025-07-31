import { component$, useVisibleTask$, isDev } from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import './global.css';

export default component$(() => {
  // Run tracking scripts in the browser only
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (typeof window !== 'undefined' && import.meta.env.PROD) {
      // Dynamically import to avoid SSR issues
      import('@vercel/speed-insights')
        .then(({ injectSpeedInsights }) => injectSpeedInsights())
        .catch((err) => console.error('Speed Insights failed:', err));

      import('@vercel/analytics')
        .then(({ inject }) => inject())
        .catch((err) => console.error('Analytics inject failed:', err));
    }
  });

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
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
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
