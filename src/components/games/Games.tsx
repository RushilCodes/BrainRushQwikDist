import { Component, component$, Signal } from "@builder.io/qwik";
import schulte from "./Schulte";
import UnknownGame from "./UnknownGame";
import OddOne from "./OddOne";

interface GameProps {
  GameCode: Signal<string>;
  GameCompletionState: Signal<boolean>;
  GameScoreInversion: Signal<boolean>;
}

interface GameData {
  game: string;
  GameCode: Signal<string>;
  GameCompletionState: Signal<boolean>;
  GameScoreInversion: Signal<boolean>;
}

const gamesMap: Record<string, Component<GameProps>> = {
  schulte: schulte,
  oddone: OddOne,
};

// export const GameForwards =

export default component$(
  ({ game, GameCode, GameCompletionState, GameScoreInversion }: GameData) => {
    const GameName = game.toLowerCase();
    const Game = gamesMap[GameName] ?? UnknownGame;
    return (
      <main class="mt-4 flex h-[63vh] flex-grow justify-center px-4">
        <Game
          GameCode={GameCode}
          GameCompletionState={GameCompletionState}
          GameScoreInversion={GameScoreInversion}
        />
      </main>
    );
  },
);
