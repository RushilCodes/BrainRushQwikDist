/* eslint-disable qwik/jsx-img */
import { component$, useVisibleTask$ } from "@builder.io/qwik";

export default component$(() => {
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    const params = new URLSearchParams(window.location.search);
    const game = params.get("game");

    if (!game) {
      document.getElementById("gamecontainer")!.textContent =
        "⚠️ No game specified.";
      throw new Error("No game parameter in URL");
    }

    // Set the game name
    document.getElementById("GameName")!.textContent =
      game.charAt(0).toUpperCase() + game.slice(1);

    const url = `https://ubybdwgcbacnuduecaoa.supabase.co/storage/v1/object/public/htmlgames/${game}.html?v=${Date.now()}`;

    try {
      const data = await (await fetch(url)).text();
      const html = data;
      document.getElementById("gamecontainer")!.innerHTML = html;

      // Optionally execute <script> tags from the loaded HTML
      const temp = document.createElement("div");
      temp.innerHTML = html;
      temp.querySelectorAll("script").forEach((oldScript) => {
        const newScript = document.createElement("script");
        if (oldScript.src) newScript.src = oldScript.src;
        else newScript.textContent = oldScript.textContent;
        document.body.appendChild(newScript);
      });
    } catch (err: any) {
      document.getElementById("gamecontainer")!.textContent =
        "⚠️ Failed to load game: " + err.message;
      console.error(err);
    }
  });
  return (
    <>
      <header class="sticky top-0 z-10 w-full bg-white shadow-md">
        <div class="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-4">
          <div class="flex items-center space-x-3">
            <img
              src="/favicon.webp"
              alt="Brain Rush Logo"
              class="h-10 w-10"
              width="10"
              height="10"
            />
            <h1
              id="GameName"
              class="text-2xl font-bold tracking-tight text-blue-700"
            >
              Sudoku
            </h1>
          </div>
          <a href="/" class="text-sm font-medium text-blue-500">
            ← Back to Hub
          </a>
        </div>
      </header>
      <div id="gamecontainer"></div>
      <footer class="mt-auto pt-4 pb-2 text-center text-sm text-gray-400">
        © 2025 Brain Rush — Keep your mind sharp
      </footer>
    </>
  );
});
