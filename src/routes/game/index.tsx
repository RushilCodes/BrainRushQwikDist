/* eslint-disable qwik/jsx-img */
import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useHtmlContent = routeLoader$(async ({ query }) => {
  const game = query.get("game");

  if (!game) {
    return { error: "⚠️ No game specified.", html: "" };
  }

  try {
    const url = `https://1vnkxjbyodanjftq.public.blob.vercel-storage.com/Html/${game}.min.html`;
    console.log(game)
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch");

    const html = await res.text();
    return { game, html };
  } catch (err: any) {
    return { error: "⚠️ Failed to load game: " + err.message, html: "" };
  }
});

export default component$(() => {
  const data = useHtmlContent();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    // Execute any <script> tags in fetched HTML (client-side only)
    const temp = document.createElement("div");
    temp.innerHTML = data.value.html;
    temp.querySelectorAll("script").forEach((oldScript) => {
      const newScript = document.createElement("script");
      if (oldScript.src) newScript.src = oldScript.src;
      else newScript.textContent = oldScript.textContent;
      document.body.appendChild(newScript);
    });
  });

  return (
    <>
      <header class="sticky top-0 z-10 w-full bg-white shadow-md">
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

        <div class="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-4">
          <div class="flex items-center space-x-3">
            <img
              src="/favicon-96.webp"
              srcset="
                  /favicon-32.webp 1x,
                  /favicon-64.webp 2x,
                  /favicon-96.webp 3x,
                  /favicon-128.webp 4x
                   "
              alt="Brain Rush Logo"
              class="h-10 w-10"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <h1
              id="GameName"
              class="text-2xl font-bold tracking-tight text-blue-700"
            >
              {data.value.game
                ? data.value.game.charAt(0).toUpperCase() +
                  data.value.game.slice(1)
                : "No Game"}
            </h1>
          </div>
          <a href="/" class="text-sm font-medium text-blue-500">
            ← Back to Hub
          </a>
        </div>
      </header>

      <div
        id="gamecontainer"
        dangerouslySetInnerHTML={data.value.error || data.value.html}
      />

      <footer class="mt-auto pt-4 pb-2 text-center text-sm text-gray-400">
        © 2025 Brain Rush — Keep your mind sharp
      </footer>
    </>
  );
});
