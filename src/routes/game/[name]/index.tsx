// import { Session } from "@auth/qwik";
import { component$, useSignal } from "@builder.io/qwik";
import { DocumentHead, routeLoader$, useLocation } from "@builder.io/qwik-city";
import DocumentHeader from "~/components/DocumentHeader";
import Footer from "~/components/Footer";
import Games from "~/components/games/Games";
import { LeaderboardPanel } from "~/components/Leaderboard/Leaderboard";
import SubmitLeaderBoard from "~/components/Leaderboard/SubmitLeaderBoard";


export const useGameData = routeLoader$(async ({ params }) => {
  const req = await fetch("https://brainrush.fun/api/GameStorage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          game (id: "${params.name}") {
            name
            description
            finished
          }
        }
      `,
    }),
  });
  const data = await req.json();
  return data.data.game;
});

export default component$(() => {
  const game = useLocation().params.name;
  const leaderboard = useSignal(false);
  const GameCode = useSignal<string>("");
  const GameCompletionState = useSignal<boolean>(false);
  const GameScoreInversion = useSignal<boolean>(false);

  return (
    <>
      <DocumentHeader Homepage={false} />
      <div class="flex justify-end">
        <button
          class="flex items-center gap-1 rounded-bl-3xl border border-gray-400 px-3 py-2 text-sm font-medium text-gray-600 shadow-md transition hover:bg-blue-50 hover:text-blue-700"
          onClick$={() => (leaderboard.value = !leaderboard.value)}
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
          Leaderboard (BETA)
        </button>
      </div>
      <Games
        game={game}
        GameCode={GameCode}
        GameCompletionState={GameCompletionState}
        GameScoreInversion={GameScoreInversion}
      />
      <SubmitLeaderBoard
        GameCode={GameCode}
        GameCompletionState={GameCompletionState}
        GameScoreInversion={GameScoreInversion}
      />
      <Footer privacy={true} toc={true} />
      <LeaderboardPanel leaderboard={leaderboard} useGame={GameCode} />
    </>
  );
});
export const head: DocumentHead = ({ resolveValue }) => {
  const game = resolveValue(useGameData); 

  return {
    title: "" + game.name,
    meta: [
      {
        name: "description",
        content:
          "Challenge your brain with memory games, logic puzzles, and focus tests. New games added weekly to keep your mind sharp. Start your brain training now!",
      },
      {
        name: "keywords",
        content:
          "brain games, free brain puzzles, memory training, logic games, focus challenges, cognitive training, online brain games, brain teaser, IQ test games, brain rush games",
      },
    ],
  };

};