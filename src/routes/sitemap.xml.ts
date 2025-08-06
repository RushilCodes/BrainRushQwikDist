// src/routes/sitemap.xml.ts
import { type RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ send }) => {
  const baseUrl = "https://brainrush.fun";
  let gameRoutes: string[] = [];

  try {
    const res = await fetch(
      "https://1vnkxjbyodanjftq.public.blob.vercel-storage.com/Static/gameData.json",
    );

    if (res.ok) {
      const games = await res.json();

      if (Array.isArray(games)) {
        gameRoutes = games.map((game: any) => `game/${game.name}`);
      } else if (typeof games === "object" && games !== null) {
        gameRoutes = Object.keys(games).map((name) => `game/${name}`);
      }
    }
  } catch (err) {
    console.error("Error fetching game data:", err);
  }

  const staticRoutes = ["", "about", "contact"]; // update these as needed
  const allRoutes = [...staticRoutes, ...gameRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(
      (route) => `
    <url>
      <loc>${baseUrl}/${route}</loc>
    </url>
  `,
    )
    .join("")}
</urlset>`;

  send(
    new Response(sitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
      },
    }),
  );
};
