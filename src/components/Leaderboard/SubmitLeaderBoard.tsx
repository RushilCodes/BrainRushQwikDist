import { component$, Signal, useVisibleTask$ } from "@builder.io/qwik";
import { useSession } from "~/routes/plugin@auth";

interface LeaderBoardSendDetails {
  GameCode: Signal<string>;
  GameScoreInversion: Signal<boolean>;
  GameCompletionState: Signal<boolean>;
}

export default component$(
  ({
    GameCode,
    GameScoreInversion,
    GameCompletionState,
  }: LeaderBoardSendDetails) => {
    const session = useSession();

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      // Listen for game completion
      const listener = () => {
        const gamecodeKey = GameCode.value;
        if (!gamecodeKey) return;

        const scoreRaw = localStorage.getItem(gamecodeKey);
        if (!scoreRaw) return;

        const score = parseInt(scoreRaw);
        const invert = GameScoreInversion.value === true;
        const name = session.value?.user?.name ?? "Anonymous";

        fetch("/api/leaderboard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            score,
            game: gamecodeKey,
            invert,
          }),
        });
      };

      // Watch for `gameCompleted` = "true" in localStorage
      const interval = setInterval(() => {
        if (GameCompletionState.value) {
          GameCompletionState.value = false;
          listener();
        }
      }, 1000);

      return () => clearInterval(interval);
    });

    return null;
  },
);
