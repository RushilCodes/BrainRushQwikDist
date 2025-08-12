import {
  component$,
  useSignal,
  $,
  useVisibleTask$,
  useStore,
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
    // Signals and store for state
    const shapesContainer = useSignal<HTMLDivElement | undefined>();
    const currentDifficulty = useSignal<"easy" | "medium" | "hard">("medium");
    const score = useSignal(0);
    const timeLeft = useSignal(40);
    const timerId = useSignal<number | null>(null);

    // Local high scores for each difficulty
    const highScores = useStore({
      easy: 0,
      medium: 0,
      hard: 0,
    });

    useVisibleTask$(() => {
      highScores.easy =
        Number(localStorage.getItem("oddOneHighScore_easy")) || 0;
      highScores.medium =
        Number(localStorage.getItem("oddOneHighScore_medium")) || 0;
      highScores.hard =
        Number(localStorage.getItem("oddOneHighScore_hard")) || 0;
    });

    // Constants
    const shapeTypes = ["square", "circle"];
    const colors = [
      "#ef4444",
      "#10b981",
      "#3b82f6",
      "#f59e0b",
      "#8b5cf6",
      "#ec4899",
    ];

    const updateScoreDisplay = $(async () => {
      if (score.value > highScores[currentDifficulty.value]) {
        highScores[currentDifficulty.value] = score.value;
        localStorage.setItem(
          `oddOneHighScore_${currentDifficulty.value}`,
          String(score.value),
        );
      }
      GameCode.value = `oddOneHighScore_${currentDifficulty.value}`;
    });

    const resetTimer = $(function resetTimer() {
      if (timerId.value) clearInterval(timerId.value);
      timeLeft.value = 40;

      timerId.value = window.setInterval(() => {
        timeLeft.value--;
        if (timeLeft.value <= 0) {
          if (timerId.value) clearInterval(timerId.value);
          Swal.fire({
            title: "⏱️ Time's Up!",
            text: `Your final score is ${score.value}`,
            icon: "info",
            confirmButtonText: "Got it!",
          }).then((result) => {
            if (result.isConfirmed) {
              resetTimer();
              GameCompletionState.value = false;
            }
          });
          score.value = 0;
          updateScoreDisplay();
          generateShapes();
          GameCompletionState.value = true;
          dispatchEvent(new Event("gamecodechange"));
        }
      }, 1000);
    });

    const getDifficultySettings = $(async () => {
      if (currentDifficulty.value === "easy")
        return { total: 6, subtle: false };
      if (currentDifficulty.value === "medium")
        return { total: 9, subtle: true };
      return { total: 12, subtle: true };
    });

    const randomFrom = $(async (arr: any[]) => {
      return arr[Math.floor(Math.random() * arr.length)];
    });

    const shadeColor = $(async (color: string, percent: number) => {
      const f = parseInt(color.slice(1), 16),
        t = percent < 0 ? 0 : 255,
        p = Math.abs(percent) / 100,
        R = f >> 16,
        G = (f >> 8) & 0x00ff,
        B = f & 0x0000ff;
      return (
        "#" +
        (
          0x1000000 +
          (Math.round((t - R) * p) + R) * 0x10000 +
          (Math.round((t - G) * p) + G) * 0x100 +
          (Math.round((t - B) * p) + B)
        )
          .toString(16)
          .slice(1)
      );
    });

    // Store generated shapes data to render
    const shapes = useSignal<
      {
        id: number;
        type: string;
        color: string;
        isOdd: boolean;
        clicked: boolean;
        correct: boolean | null;
      }[]
    >([]);

    const generateShapes = $(async () => {
      const { total, subtle } = await getDifficultySettings();

      const baseColor = await randomFrom(colors);
      const baseType = await randomFrom(shapeTypes);

      let oddColor = baseColor;
      let oddType = baseType;

      if (subtle) {
        const shadeOffset = Math.random() > 0.5 ? 15 : -15;
        oddColor = await shadeColor(baseColor, shadeOffset);
      } else {
        while (oddColor === baseColor) oddColor = await randomFrom(colors);
        while (oddType === baseType) oddType = await randomFrom(shapeTypes);
      }

      const oddIndex = Math.floor(Math.random() * total);

      const newShapes = [];
      for (let i = 0; i < total; i++) {
        newShapes.push({
          id: i,
          type: i === oddIndex ? oddType : baseType,
          color: i === oddIndex ? oddColor : baseColor,
          isOdd: i === oddIndex,
          clicked: false,
          correct: null,
        });
      }
      shapes.value = newShapes;
    });

    const handleShapeClick = $(async (id: number) => {
      const shape = shapes.value[id];
      if (shape.clicked) return; // Ignore multiple clicks

      shape.clicked = true;

      if (shape.isOdd) {
        shape.correct = true;
        score.value++;
        updateScoreDisplay();
      } else {
        shape.correct = false;
        score.value = Math.max(0, score.value - 1);
        updateScoreDisplay();
      }
      generateShapes();
    });

    const setDifficulty = $(async (level: "easy" | "medium" | "hard") => {
      currentDifficulty.value = level;
      GameCode.value = `oddOneHighScore_${currentDifficulty.value}`;
      score.value = 0;
      updateScoreDisplay();
      resetTimer();
      generateShapes();
    });

    useVisibleTask$(async () => {
      await setDifficulty("medium");
      GameScoreInversion.value = false;
      GameCompletionState.value = false;
      generateShapes();
      resetTimer();
    });

    return (
      <div class="flex flex-col font-sans text-gray-900">
        <main class="flex w-full max-w-3xl flex-grow flex-col items-center justify-center py-6 pt-10">
          <div class="mb-4 text-center">
            <p class="text-gray-700">
              Find and click the shape that is different!
            </p>
            <p class="mt-1 text-sm text-blue-600">
              Score: <span>{score.value}</span> | High Score:{" "}
              <span>{highScores[currentDifficulty.value]}</span> | Time Left:{" "}
              <span>{timeLeft.value}</span>s
            </p>
          </div>

          <div id="difficultyButtons" class="mb-6 flex gap-4">
            {(["easy", "medium", "hard"] as const).map((level) => (
              <button
                key={level}
                onClick$={async () => await setDifficulty(level)}
                class={`diffBtn rounded px-4 py-2 ${
                  currentDifficulty.value === level
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>

          <div
            id="shapes"
            class="mx-auto grid max-w-full grid-cols-3 items-center justify-items-center gap-3"
            ref={shapesContainer}
          >
            {shapes.value.map(({ id, type, color, clicked, correct }) => (
              <div
                key={id}
                class={`shape ${correct === true ? "correct" : ""} ${
                  correct === false ? "wrong" : ""
                }`}
                style={{
                  backgroundColor: color,
                  borderRadius: type === "circle" ? "50%" : "0.5rem",
                  opacity: clicked && correct === false ? 0.4 : 0.95,
                  cursor: clicked ? "default" : "pointer",
                  transition: "all 0.3s ease",
                  width: "80px",
                  height: "80px",
                  flexShrink: "0",
                  outline:
                    correct === true
                      ? "3px solid green"
                      : correct === false
                        ? "3px solid red"
                        : "none",
                  transform: clicked ? "scale(1.05)" : "none",
                }}
                onClick$={async () => await handleShapeClick(id)}
                role="button"
                tabIndex={0}
                aria-label={`Shape ${id + 1} ${type} ${
                  correct === true
                    ? "correct"
                    : correct === false
                      ? "wrong"
                      : ""
                }`}
              />
            ))}
          </div>
        </main>
      </div>
    );
  },
);
