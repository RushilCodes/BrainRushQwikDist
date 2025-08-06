/* eslint-disable qwik/jsx-img */
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import Swal from "sweetalert2";
import { useSession } from "~/routes/plugin@auth";

export const useHtmlContent = routeLoader$(async ({ params }) => {
  const game = params.name;

  if (!game) {
    return { error: "⚠️ No game specified.", html: "" };
  }

  try {
    const url = `https://1vnkxjbyodanjftq.public.blob.vercel-storage.com/Html/${game}.min.html`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch");

    const html = await res.text();
    return { game, html };
  } catch (err: any) {
    return { error: "⚠️ Failed to load game: " + err.message, html: "" };
  }
});

export const useLeaderboardAdd = routeAction$(
  async ({ name, score, gameId, Invert }) => {
    try {
      const url = "https://brainrush.fun/api/leaderboard";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, score, gameId, Invert }),
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const html = await res.json();
      return { success: true, html };
    } catch (error: any) {
      return { success: false, error: error };
    }
  },
);

export default component$(() => {
  const data = useHtmlContent();
  const action = useLeaderboardAdd();
  const leaderboard = useSignal(false);
  const session = useSession();

  const name = session.value?.user?.name;

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

  // eslint-disable-next-line qwik/no-use-visible-task
useVisibleTask$(() => {
  requestAnimationFrame(async () => {
    const gamecodeKey = localStorage.getItem("gamecode");
    if (!gamecodeKey) return;

    const scoreRaw = localStorage.getItem(gamecodeKey);
    if (!scoreRaw) return;

    const score = parseInt(scoreRaw);
    const invert = localStorage.getItem("type") === "true";
    const name = session.value?.user?.name ?? "Anonymous";
    const game = data.value.game;

    try {
      const res = await fetch("https://brainrush.fun/api/leaderboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, score, game, invert }),
      });

      const data = await res.json();
      console.log("Leaderboard submitted:", data);
    } catch (err) {
      console.error("Leaderboard submission failed:", err);
    }
  });
});


  return (
    <>
      <header class="sticky top-0 z-10 w-full bg-[#f7f6f6] shadow-md">
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

        <div class="flex w-full items-center justify-between px-4 py-7 sm:px-6">
          {/* Logo & Game Title */}
          <div class="flex items-center gap-3">
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
            <h1 class="text-2xl font-bold tracking-tight text-blue-700">
              {data.value.game
                ? data.value.game.charAt(0).toUpperCase() +
                  data.value.game.slice(1)
                : "No Game"}
            </h1>
          </div>

          {/* Actions: Back */}
          <div class="flex items-center gap-3">
            {/* Back Button */}
            <a
              href="/"
              class="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50 hover:text-blue-700"
              aria-label="Go back to homepage"
            >
              <svg
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Back
            </a>
          </div>
        </div>
      </header>
      <div class="self-end">
        {/* Leaderboard Button */}
        <button
          class="flex items-center gap-1 rounded-bl-3xl border border-gray-400 px-3 py-2 text-sm font-medium text-gray-600 shadow-md transition hover:bg-blue-50 hover:text-blue-700"
          onClick$={() =>
            Swal.fire(
              "Coming Soon!",
              "Leaderboard will be added later.",
              "info",
            )
          }
          aria-label="Leaderboard"
        >
          <svg
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="15" width="3" height="6" />
            <rect x="10" y="12" width="3" height="9" />
            <rect x="17" y="16" width="3" height="5" />
            <path d="M11.5 1l1.18 2.39 2.64.38-1.91 1.86.45 2.62-2.36-1.24-2.36 1.24.45-2.62-1.91-1.86 2.64-.38L11.5 1z" />
          </svg>
          Leaderboard
        </button>
      </div>

      <div
        id="leaderboard"
        class={[
          "absolute h-full w-100 origin-left overflow-auto shadow-md transition-all",
          leaderboard.value
            ? "visible scale-100 opacity-100"
            : "invisible scale-95 opacity-0",
        ]}
      ></div>

      <div
        id="gamecontainer"
        dangerouslySetInnerHTML={data.value.error || data.value.html}
        class="min-h-100vh flex justify-center pt-10 align-top"
      />

      <footer class="mt-auto pt-10 pb-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © 2025 Brain Rush — Keep your mind sharp
        <div class="mt-2 flex justify-center gap-6 text-sm">
          <a
            href="/privacy"
            class="hover:underline focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Privacy Policy
          </a>
          <a
            href="/Toc"
            class="hover:underline focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Terms & Conditions
          </a>
        </div>
      </footer>
    </>
  );
});
