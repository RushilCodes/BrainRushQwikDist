import {
  component$,
  useSignal,
  $,
  useVisibleTask$,
  Signal,
} from "@builder.io/qwik";
import Swal from "sweetalert2";

interface GameData {
  GameCode: Signal<string>;
  GameCompletionState: Signal<boolean>;
  GameScoreInversion: Signal<boolean>;
}

export default component$(
  ({ GameCode, GameCompletionState, GameScoreInversion }: GameData) => {
    const gridSize = useSignal(25);
    const gridCols = useSignal(5);
    const colorsForNumbers = useSignal<string[]>([]);
    const difficulty = useSignal("medium");
    const numbers = useSignal<number[]>([]);
    const currentNumber = useSignal(1);
    const startTime = useSignal<number | null>(null);
    const timer = useSignal(0);
    const bestTime = useSignal<number | null>(null);
    const gameStarted = useSignal(false);
    const gameCompleted = useSignal(false);
    const timerInterval = useSignal<number | null>(null);

    type Difficulty = "easy" | "medium" | "hard";

    const diffSettings: Record<Difficulty, { size: number; cols: number }> = {
      easy: { size: 16, cols: 4 },
      medium: { size: 25, cols: 5 },
      hard: { size: 36, cols: 6 },
    };

    const shuffleArray = $((arr: number[]) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    });

    const startTimer = $(() => {
      startTime.value = performance.now();
      timerInterval.value = window.setInterval(() => {
        timer.value = (performance.now() - (startTime.value ?? 0)) / 1000;
      }, 50);
    });

    const stopTimer = $(() => {
      if (timerInterval.value !== null) {
        clearInterval(timerInterval.value);
        timerInterval.value = null;
      }
    });

    const loadBestTime = $(() => {
      const best = localStorage.getItem(GameCode.value);
      bestTime.value = best ? parseFloat(best) : null;
    });

    const setBestTime = $((time: number) => {
      localStorage.setItem(GameCode.value, time.toFixed(2));
      bestTime.value = time;
    });

    const renderGrid = $(() => {
      numbers.value = Array.from({ length: gridSize.value }, (_, i) => i + 1);
      shuffleArray(numbers.value);
      const colors = [
        "#EF4444",
        "#F59E0B",
        "#10B981",
        "#3B82F6",
        "#8B5CF6",
        "#EC4899",
      ];
      colorsForNumbers.value = numbers.value.map(
        () => colors[Math.floor(Math.random() * colors.length)],
      );
    });

    const startGame = $(() => {
      gameStarted.value = true;
      gameCompleted.value = false;
      currentNumber.value = 1;
      timer.value = 0;
      stopTimer();
      renderGrid();
      GameCompletionState.value = false;
    });

    const setDifficulty = $((level: Difficulty) => {
      difficulty.value = level;
      gridSize.value = diffSettings[level].size;
      gridCols.value = diffSettings[level].cols;
      GameCode.value = `sudokuHighScore_${difficulty.value}`;
      loadBestTime();
    });

    const handleNumberClick = $((num: number) => {
      if (num !== currentNumber.value) return;

      if (currentNumber.value === 1) startTimer();
      currentNumber.value++;

      if (currentNumber.value > gridSize.value) {
        stopTimer();
        setTimeout(() => {
          const time = timer.value;
          Swal.fire({
            title: "🎉 Well done!",
            text: `Your time: ${time.toFixed(2)} seconds`,
            icon: "success",
            confirmButtonText: "Nice!",
          }).then(() => {
            localStorage.setItem(GameCode.value, `${time.toFixed(2)}`);
          });

          GameCompletionState.value = true;
          const best = bestTime.value ?? Infinity;
          if (time < best) setBestTime(time);
          gameCompleted.value = true;
        }, 50);
      }
    });

    const restartGame = $(() => {
      GameCompletionState.value = false;
      startGame();
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      setDifficulty("medium");
      GameScoreInversion.value = true;
      GameCompletionState.value = false;
      renderGrid();
    });

    return (
      <div class="flex w-full max-w-xl flex-col items-center">
        <p class="mb-4 text-center text-gray-700">
          Click numbers in order as fast as you can!
        </p>

        {/* Difficulty Buttons */}
        {!gameStarted.value && (
          <div id="difficultyButtons" class="mb-6 flex gap-4">
            {Object.keys(diffSettings).map((level) => (
              <button
                key={level}
                onClick$={() => setDifficulty(level as Difficulty)}
                class={
                  "diffBtn rounded px-4 py-2 " +
                  (difficulty.value === level
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-black")
                }
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Timer */}
        <div class="mb-2 text-lg font-semibold text-gray-900">
          Time: {timer.value.toFixed(2)} seconds
        </div>
        <div class="mb-6 text-lg font-semibold text-gray-900">
          Best Time: {bestTime.value?.toFixed(2) ?? "--"} seconds
        </div>

        {/* Start Button */}
        {!gameStarted.value && (
          <button
            id="startBtn"
            onClick$={startGame}
            class="mb-8 rounded bg-green-600 px-6 py-2 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-400 focus:outline-none"
          >
            Start Game
          </button>
        )}

        {/* Grid */}
        {gameStarted.value && (
          <div
            id="schulte-grid"
            class="mb-6 grid justify-center gap-2"
            style={{
              gridTemplateColumns: `repeat(${gridCols.value}, minmax(0, 1fr))`,
            }}
          >
            {numbers.value.map((num, index) => {
              const isClicked = num < currentNumber.value;
              const color = colorsForNumbers.value[index] ?? "#10B981";

              return (
                <button
                  key={num}
                  type="button"
                  style={{
                    backgroundColor: isClicked ? "#E5E7EB" : color,
                    color: isClicked ? "#9CA3AF" : "white",
                  }}
                  class="h-14 w-14 rounded text-lg hover:brightness-90 focus:ring-2 focus:ring-white focus:outline-none"
                  onClick$={() => handleNumberClick(num)}
                  disabled={isClicked}
                >
                  {num}
                </button>
              );
            })}
          </div>
        )}

        {/* Restart Button */}
        {gameCompleted.value && (
          <button
            id="restartBtn"
            onClick$={restartGame}
            class="mb-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            Restart
          </button>
        )}
      </div>
    );
  },
);
