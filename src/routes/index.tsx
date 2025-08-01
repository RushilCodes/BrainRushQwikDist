/* eslint-disable qwik/no-use-visible-task */
/* eslint-disable qwik/jsx-img */
import {
  component$,
  useSignal,
  useVisibleTask$,
  Resource,
} from "@builder.io/qwik";
import {
  routeLoader$,
  type DocumentHead,
  useNavigate,
} from "@builder.io/qwik-city";
import Swal from "sweetalert2";
import emailjs from '@emailjs/browser';


export interface Game {
  id: string;
  name: string;
  icon: string;
  description: string;
  finished?: boolean;
}

export const NameCollector = component$(() => {
  useVisibleTask$(() => {
    emailjs.init('jGjw1LnLUeu191pVE'); // your public key

    Swal.fire({
      title: 'Hey there!',
      text: 'What name would the developer know you by?',
      input: 'text',
      inputLabel: 'Your name',
      inputPlaceholder: 'Type your name...',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const name = result.value;

        Swal.fire('Thanks!', 'Sending your name...', 'success');

        emailjs.send('service_TraficTest', 'template_0c5lhdq', {
          user_name: name,
          name: name,
          time: new Date().toLocaleTimeString()
        }).then(
          () => {
            Swal.fire('Sent!', 'Your name was sent to the developer.', 'success');
          },
          (error: any) => {
            Swal.fire('Oops!', 'Failed to send: ' + error.text, 'error');
          }
        );
      }
    });
  });

  return null;
});



export const useGameData = routeLoader$<Game[]>(async () => {
  const url =
    "https://1vnkxjbyodanjftq.public.blob.vercel-storage.com/Static/gameData.json";
  const res = await fetch(url);
  return res.json();
});

export default component$(() => {
  const gamesToShow = useSignal(8);
  const searchQuery = useSignal("");
  const nav = useNavigate();
  const gameData = useGameData();

  useVisibleTask$(({ cleanup }) => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          gamesToShow.value += 8;
        }
      }
    });

    const el = document.getElementById("lazy-sentinel");
    if (el) observer.observe(el);

    cleanup(() => observer.disconnect());
  });

  return (
    <>
    <NameCollector></NameCollector>
      <header class="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-4 shadow-md">
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

          <h1 class="text-2xl font-bold tracking-tight text-blue-700">
            Brain Rush
          </h1>
        </div>

        <div class="sticky top-16 z-10 flex items-center justify-around border-t bg-white px-4 py-3 shadow-sm">
          {/* Leaderboard */}
          <button
            class="flex flex-col items-center pr-10 text-gray-600 transition hover:text-blue-500"
            onClick$={() =>
              Swal.fire(
                "Coming Soon!",
                "Leaderboard will be added later.",
                "info",
              )
            }
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect
                x="3"
                y="15"
                width="3"
                height="6"
                fill="none"
                stroke="currentColor"
              />
              <rect
                x="10"
                y="12"
                width="3"
                height="9"
                fill="none"
                stroke="currentColor"
              />
              <rect
                x="17"
                y="16"
                width="3"
                height="5"
                fill="none"
                stroke="currentColor"
              />

              <path
                d="
      M11.5 1
      l1.18 2.39
      2.64 0.38
      -1.91 1.86
      0.45 2.62
      -2.36 -1.24
      -2.36 1.24
      0.45 -2.62
      -1.91 -1.86
      2.64 -0.38
      1.18 -2.39
      Z
    "
                fill="none"
                stroke="currentColor"
              />
            </svg>

            <span class="mt-1 text-xs">Leaderboard</span>
          </button>

          {/* Streak */}
          <button
            class="group flex flex-col items-center pr-10 text-gray-600 transition hover:text-orange-500"
            onClick$={() =>
              Swal.fire(
                "Coming Soon!",
                "Streak tracking is on the way!",
                "info",
              )
            }
          >
            <svg
              class="h-6 w-6 text-inherit transition group-hover:text-orange-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13.5 2.5C13 4.5 14.5 6 14.5 6s-3.5-1-5.5-5c-1 3 0 6-2 8-2 2.5-1.5 6 1 8 3 2.5 9 1.5 9-4 0-2-1.5-3.5-3-5z" />
            </svg>
            <span class="mt-1 text-xs">Streak</span>
          </button>

          {/* Star */}
          <button
            class="flex flex-col items-center pr-10 text-gray-600 transition hover:text-yellow-500"
            onClick$={() =>
              Swal.fire("Coming Soon!", "Favorites system on the way!", "info")
            }
          >
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span class="mt-1 text-xs">Star</span>
          </button>

          {/* Profile */}
          <button
            class="flex flex-col items-center text-gray-600 transition hover:text-blue-500"
            onClick$={() =>
              Swal.fire(
                "Coming Soon!",
                "Profile system under development.",
                "info",
              )
            }
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.121 17.804A9.978 9.978 0 0112 15c2.21 0 4.247.714 5.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span class="mt-1 text-xs">Profile</span>
          </button>
        </div>
      </header>

      <main class="mx-auto h-full min-h-screen w-full max-w-7xl px-4 py-8 sm:px-8">
        <div class="mb-6 flex items-center gap-3 rounded-md border border-gray-200 px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search games..."
            bind:value={searchQuery}
            class="w-full bg-transparent text-sm focus:outline-none"
          />
        </div>

        <Resource
          value={gameData}
          onPending={() => (
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <div class="h-64 w-full animate-pulse rounded-lg bg-gray-100"></div>
            </div>
          )}
          onRejected={(error) => (
            <div class="font-semibold text-red-600">Error: {error.message}</div>
          )}
          onResolved={(games: Game[]) => {
            const filtered = games.filter(
              (g) =>
                g.finished &&
                g.name
                  .toLowerCase()
                  .includes(searchQuery.value.trim().toLowerCase()),
            );
            return (
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.slice(0, gamesToShow.value).map((game) => (
                  <button
                    key={game.id}
                    class="w-full transform cursor-pointer rounded-lg border border-gray-100 bg-white p-5 pt-10 pb-5 text-left shadow transition-transform hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    aria-label={`Play ${game.name}`}
                    onClick$={() => nav(`/game?game=${game.id}`)}
                  >
                    <img
                      src={game.icon}
                      alt={`${game.name} Icon`}
                      class="h-36 w-full object-cover"
                      decoding="async"
                      fetchPriority="high"
                    />
                    <h2 class="mb-2 pt-5 text-xl font-bold text-gray-800">
                      {game.name}
                    </h2>
                    <p class="text-sm text-gray-600">{game.description}</p>
                  </button>
                ))}
                <div id="lazy-sentinel" class="h-1 w-full"></div>
              </div>
            );
          }}
        />
      </main>

      <footer class="pb-6 text-center text-sm text-gray-400">
        © 2025 Brain Rush — Keep your mind sharp
      </footer>
    </>
  );
});

export const head: DocumentHead = {
  title: "Games | Brain Rush",
  meta: [
    {
      name: "description",
      content:
        "Play mind-blowing games and boost your brainpower on Brain Rush!",
    },
  ],
};
