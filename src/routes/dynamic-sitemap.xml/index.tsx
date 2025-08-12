import type { RequestHandler } from "@builder.io/qwik-city";
import { routes } from "@qwik-city-plan";
import { createSitemap } from "./create-sitemap";
import { Game } from ".."; // Assuming Game type has { name: string; finished: boolean }

export const config = {
  runtime: "node", // forces Node runtime
};

export const onGet: RequestHandler = async (ev) => {
  const games: Game[] = await fetch(
    "https://1vnkxjbyodanjftq.public.blob.vercel-storage.com/Static/gameData.json",
  ).then((res) => res.json());

  const siteRoutes = routes
    .map(([route]) => route as string)
    .filter(
      (route) =>
        route !== "/" &&
        route !== "Toc" &&
        route !== "Toc/" &&
        route !== "privacy" &&
        route !== "privacy/" &&
        !route.startsWith("game/[name]") &&
        !route.startsWith("api/") &&
        route !== "dynamic-sitemap.xml" &&
        route !== "ads.txt",
    );
  console.log(siteRoutes);
  const sitemap = createSitemap([
    { loc: "/", priority: 1 },
    { loc: "/Toc", priority: 0.5 },
    { loc: "/privacy", priority: 0.5 },
    // Only include games where finished === true
    ...games
      .filter((game) => game.finished)
      .map((game) => ({
        loc: `/game/${encodeURIComponent(game.name)}`,
        priority: 0.9,
      })),
    ...siteRoutes.map((route) => ({
      loc: route,
      priority: 0.8,
    })),
  ]);

  const response = new Response(sitemap, {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });

  ev.send(response);
};
