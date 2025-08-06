import { type RequestHandler } from "@builder.io/qwik-city";
import redis from "~/lib/redis"; // ensure this exports a Redis instance from @upstash/redis

// Normalize any name to lowercase without whitespace
const normalize = (name: string) => name.trim().toLowerCase();

export const onPost: RequestHandler = async ({ json, request }) => {
  try {
    const body = await request.json();
    const { name, score, game, invert } = body;

    if (
      typeof name !== "string" ||
      typeof game !== "string" ||
      typeof score !== "number"
    ) {
      json(400, { error: "Invalid or missing 'name', 'score', or 'game'" });
      return;
    }

    const normalizedGame = normalize(game);
    const key = `lb:${normalizedGame}`;
    const invertKey = `lb:invert:${normalizedGame}`;
    const actualScore = invert ? -score : score;

    // Store invert flag (optional)
    if (typeof invert === "boolean") {
      await redis.set(invertKey, invert.toString());
    }

    // Add user score to leaderboard
    await redis.zadd(key, {
      score: actualScore,
      member: name,
    });

    json(200, { success: true });
  } catch (err) {
    json(500, {
      error: "Internal Server Error",
      details: err instanceof Error ? err.message : String(err),
    });
  }
};

export const onGet: RequestHandler = async ({ query, json }) => {
  try {
    const game = query.get("game");
    if (!game) {
      json(400, { error: "Missing 'game' query parameter" });
      return;
    }

    const normalizedGame = normalize(game);
    const key = `lb:${normalizedGame}`;
    const invertKey = `lb:invert:${normalizedGame}`;
    const invert = (await redis.get(invertKey)) === "true";

    const user = query.get("user");
    const count = Math.max(1, parseInt(query.get("count") || "10"));

    if (user) {
      const score = await redis.zscore(key, user);
      if (score === null) {
        json(404, { error: "User not found in leaderboard" });
        return;
      }

      json(200, {
        user,
        score: Math.abs(Number(score)),
      });
      return;
    }

    // Leaderboard: descending (highest scores) unless inverted
const rawEntries = await redis.zrange(key, 0, count - 1, {
  rev: !invert,
  withScores: true,
});

const leaderboard = [];
for (let i = 0; i < rawEntries.length; i += 2) {
  const name = rawEntries[i];
  const score = Number(rawEntries[i + 1]);
  leaderboard.push({
    name,
    score: Math.abs(score),
  });
}


    json(200, { leaderboard });
  } catch (err) {
    json(500, {
      error: "Internal Server Error",
      details: err instanceof Error ? err.message : String(err),
    });
  }
};
