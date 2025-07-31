/* eslint-disable qwik/jsx-img */
import { component$, Resource } from "@builder.io/qwik";
import {
  routeLoader$,
  useNavigate,
} from "@builder.io/qwik-city";

export interface Game {
  id: string;
  name: string;
  icon: string;
  description: string;
  finished: boolean;
}

export const useGameData = routeLoader$<Game[]>(async () => {
  const url =
    "https://ubybdwgcbacnuduecaoa.supabase.co/storage/v1/object/public/gameassets/gameData.json";
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch game data");
  }
  return await res.json();
});

export default component$(() => {
  const gamedata = useGameData();
  const nav = useNavigate();
  

  return (
    <>
      <link
        rel="preconnect"
        href="https://ubybdwgcbacnuduecaoa.supabase.co"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        as="fetch"
        href="https://ubybdwgcbacnuduecaoa.supabase.co/storage/v1/object/public/gameassets/gameData.json"
        crossOrigin="anonymous"
      />

      <header class="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-4 shadow-md">
        <div class="flex items-center space-x-3">
          <img
            src="/favicon.webp"
            height="60"
            width="60"
            alt="Brain Rush Logo"
            fetchPriority="high"
            decoding="async"
            loading="eager"
            class="h-10 w-10"
          />

          <h1 class="text-2xl font-bold tracking-tight text-blue-700">
            Brain Rush
          </h1>
        </div>
        <p class="hidden text-sm font-medium text-gray-400 sm:block">
          Train your brain with fun challenges
        </p>
      </header>

      <main class="mx-auto w-full max-w-7xl px-4 py-8 sm:px-8">
        <Resource
          value={gamedata}
          onPending={() => (
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  class="h-64 animate-pulse rounded-lg bg-gray-100"
                ></div>
              ))}
            </div>
          )}
          onRejected={(error) => (
            <div class="font-semibold text-red-600">Error: {error.message}</div>
          )}
          onResolved={(games: Game[]) => (
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {games.map((game) => {
                if (game.finished){
                return (
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
                    loading="lazy"
                    decoding="async"
                  />

                  <h2 class="mb-2 pt-5 text-xl font-bold text-gray-800">
                    {game.name}
                  </h2>
                  <p class="text-sm text-gray-600">{game.description}</p>
                </button>
              )}})}
            </div>
          )}
        />
      </main>

      <footer class="pb-6 text-center text-sm text-gray-400">
        © 2025 Brain Rush — Keep your mind sharp
      </footer>
    </>
  );
});

