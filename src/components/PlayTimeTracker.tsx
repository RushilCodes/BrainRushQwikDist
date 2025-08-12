import { component$, useVisibleTask$ } from "@builder.io/qwik";

export const TotalPlaytimePopup = component$(() => {
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    let totalSeconds = 0;
    const key = "totalPlaytime";

    // Restore from localStorage
    const stored = localStorage.getItem(key);
    if (stored) totalSeconds = parseInt(stored, 10);

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        totalSeconds++;
        localStorage.setItem(key, String(totalSeconds));

        if (totalSeconds >= 300) {
          clearInterval(interval);
          totalSeconds = 0;
          localStorage.removeItem("totalPlaytime");
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  return null;
});
