import { type RequestHandler } from "@builder.io/qwik-city";
import redis from "~/lib/redis"; // ensure this exports a Redis instance from @upstash/redis

// Normalize any name to lowercase without whitespace
const normalize = (name: string) => name.trim().toLowerCase();

export const onPost: RequestHandler = async ({ json, request, headers }) => {
  headers.append("Access-Control-Allow-Origin", "*");
  headers.append("Access-Control-Allow-Methods", "GET, POST");
  headers.append("Access-Control-Allow-Headers", "Content-Type");
  try {
    const body = await request.json();
    const { name, score, game, invert } = body;

    if (
      typeof name !== "string" ||
      typeof game !== "string" ||
      typeof score !== "number"
    ) {
      json(400, {
        error: "Invalid or missing 'name', 'score', or 'game'",
      });
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

export const onGet: RequestHandler = async ({ query, json, headers }) => {
  headers.append("Access-Control-Allow-Origin", "*");
  headers.append("Access-Control-Allow-Methods", "GET, POST");
  headers.append("Access-Control-Allow-Headers", "Content-Type");

  try {
    const game = query.get("game");
    if (!game) {
      json(400, {
        error: "Missing 'game' query parameter",
      });
      return;
    }

    const normalizedGame = game.trim().toLowerCase();
    const key = `lb:${normalizedGame}`;
    const invertKey = `lb:invert:${normalizedGame}`;
    const invertRaw = await redis.get(invertKey);
    const invert = invertRaw === "true";

    const count = Math.max(1, parseInt(query.get("count") || "10"));

    // DEBUG: show what we're fetching
    const raw = await redis.zrange(key, 0, count - 1, {
      rev: !invert, // false -> rev=true (descending order)
      withScores: true,
    });

    // Parse alternating array: [member1, score1, member2, score2, ...]
    const leaderboard: { name: string; score: number }[] = [];

    for (let i = 0; i < raw.length; i += 2) {
      const name: any = raw[i];
      const score = Number(raw[i + 1]);
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
