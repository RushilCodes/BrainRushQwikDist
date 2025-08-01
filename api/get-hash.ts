// api/game-hash.js
import { createClient } from "@libsql/client";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const client = createClient({
  url: "libsql://brain-rush-hashstore-vercel-icfg-xbfnfvksfcyfjvbr0bmr4v9u.aws-us-east-1.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NTM5NTMwMTQsImlkIjoiNzhhNzIyNzYtZTI1NS00Yzg1LWE3YzAtYjhkMzE0ZjJiMDhiIiwicmlkIjoiYTk1YzQwZjktMDg0MC00ZWE4LTg0MWYtNzU5MDkzZjlkODA5In0.d5FS3dSoYwuFeuWeiPFk1vnlAaO5M87qBG21YO8TnQTtTy2Tu5aE5YkI8pFwmaal6xGVhiNso1bflsQ1ATe5CQ",
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") {
      const { name } = req.query;
      if (!name) return res.status(400).json({ error: "Missing `name` query" });

      const result = await client.execute(
        "SELECT hashed_name FROM game_hashes WHERE game_name = ?",
        [!name],
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Game not found" });
      }

      return res.status(200).json({ file: result.rows[0].hashed_name });
    }

    if (req.method === "POST") {
      const { name, hash } = req.body;
      if (!name || !hash) {
        return res
          .status(400)
          .json({ error: "Must include `name` and `hash` in body" });
      }

      // Upsert into Turso: create table game_hashes(game_name TEXT PRIMARY KEY, hashed_name TEXT);
      await client.execute({
        sql: `
          INSERT INTO game_hashes (game_name, hashed_name)
          VALUES (?, ?)
          ON CONFLICT (game_name) DO UPDATE SET hashed_name = excluded.hashed_name
        `,
        args: [name, hash],
      });

      return res.status(200).json({ success: true, name, hash });
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).end("Method Not Allowed");
  } catch (err: any) {
    console.error("API error:", err);
    return res.status(500).json({ error: err.message || "Unknown error" });
  }
}
