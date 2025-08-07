import { component$, $, useSignal, useVisibleTask$, Signal } from '@builder.io/qwik';

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



export const LeaderboardPanel = component$(({ leaderboard, useGame }: LeaderboardProps) => {

  const leaderboardData = useSignal<Leaderboard>({ leaderboard: [] });
  const loading = useSignal(true);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async ({track}) => {
    const game = track(() => useGame.value)
    const count = 10;
    console.log(game)
    if (!game) return;

    try {
      const url = `https://brainrush.fun/api/leaderboard?game=${game}&count=${count}`
      const res = await fetch(url);
      leaderboardData.value = await res.json();
    } catch (e) {
      console.error('Failed to fetch leaderboard:', e);
    }

    loading.value = false;
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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  return (
    <>
      {/* Overlay behind leaderboard but over everything else */}
      <div
        class={[
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300',
          leaderboard.value ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none',
        ]}
        onClick$={() => (leaderboard.value = false)}
      />

      {/* Slide-in leaderboard panel */}
      <div
        id="leaderboard"
        class={[
          'fixed top-0 right-0 z-40 h-full w-80 max-w-full bg-white shadow-lg origin-right transition-all duration-300 ease-in-out overflow-y-auto',
          leaderboard.value
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0 pointer-events-none',
        ]}
        onTouchStart$={handleSwipeStart$}
        onTouchMove$={handleSwipeMove$}
        onTouchEnd$={handleSwipeEnd$}
      >
        {/* Close Button */}
        <button
          class="absolute top-4 right-4 text-black z-10"
          onClick$={() => (leaderboard.value = false)}
        >
          ✕
        </button>

        {/* Content */}
        <div class="p-6">
          <h2 class="text-xl font-bold mb-4">Leaderboard</h2>
        {loading.value ? (
        <div>Loading...</div>
      ) : leaderboardData.value.leaderboard.length > 0 ? (
        leaderboardData.value.leaderboard.map((entry) => (
          <div key={entry.name} class="p-2 border-b">
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
});
