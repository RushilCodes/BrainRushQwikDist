import {
  component$,
  $,
  useSignal,
  useVisibleTask$,
  Signal,
} from "@builder.io/qwik";

interface LeaderboardEntry {
  name: string;
  score: number;
}

interface Leaderboard {
  leaderboard: LeaderboardEntry[];
}

interface LeaderboardProps {
  leaderboard: Signal<boolean>;
  useGame: Signal<string>;
}

export const LeaderboardPanel = component$(
  ({ leaderboard, useGame }: LeaderboardProps) => {
    const leaderboardData = useSignal<Leaderboard>({ leaderboard: [] });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async ({ track }) => {
      const game = track(() => useGame.value); // track the signal's .value
      if (!game) return; // early exit if game is empty to avoid bad request

      const count = 10;
      const url = `https://brainrush.fun/api/leaderboard?game=${game}&count=${count}`;
      console.log(url);
      const res = await fetch(url);

      if (!res.ok) {
        // handle HTTP errors gracefully
        console.error("Failed to fetch leaderboard:", res.statusText);
        return;
      }

      leaderboardData.value = await res.json();
    });

    const startX = useSignal(0);
    const currentX = useSignal(0);

    const handleSwipeStart$ = $((e: TouchEvent) => {
      startX.value = e.touches[0].clientX;
    });

    const handleSwipeMove$ = $((e: TouchEvent) => {
      currentX.value = e.touches[0].clientX;
    });

    const handleSwipeEnd$ = $(() => {
      const diff = currentX.value - startX.value;
      if (diff < -50) {
        leaderboard.value = false;
      }
    });

    // Prevent scrolling when leaderboard is open
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
      track(() => leaderboard.value);
      if (leaderboard.value) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    return (
      <>
        {/* Overlay behind leaderboard but over everything else */}
        <div
          class={[
            "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300",
            leaderboard.value
              ? "visible opacity-100"
              : "pointer-events-none invisible opacity-0",
          ]}
          onClick$={() => (leaderboard.value = false)}
        />

        {/* Slide-in leaderboard panel */}
        <div
          id="leaderboard"
          class={[
            "fixed top-0 right-0 z-40 h-full w-80 max-w-full origin-right overflow-y-auto bg-white shadow-lg transition-all duration-300 ease-in-out",
            leaderboard.value
              ? "translate-x-0 opacity-100"
              : "pointer-events-none translate-x-full opacity-0",
          ]}
          onTouchStart$={handleSwipeStart$}
          onTouchMove$={handleSwipeMove$}
          onTouchEnd$={handleSwipeEnd$}
        >
          {/* Close Button */}
          <button
            class="absolute top-4 right-4 z-10 text-black"
            onClick$={() => (leaderboard.value = false)}
          >
            ✕
          </button>

          {/* Content */}
          <div class="p-6">
            <h2 class="mb-4 text-xl font-bold">Leaderboard</h2>
            {leaderboardData.value.leaderboard.length > 0 ? (
              leaderboardData.value.leaderboard.map((entry) => (
                <div key={entry.name} class="border-b p-2">
                  <div class="font-semibold">{entry.name}</div>
                  <div class="text-gray-500">Score: {entry.score}</div>
                </div>
              ))
            ) : (
              <div>No entries found.</div>
            )}
          </div>
        </div>
      </>
    );
  },
);
