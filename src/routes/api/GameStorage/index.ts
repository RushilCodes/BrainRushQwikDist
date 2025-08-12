import { createYoga, createSchema } from "graphql-yoga";
import { createClient } from "@libsql/client";
import type { RequestHandler } from "@builder.io/qwik-city";

const conn = createClient({
  url: import.meta.env.PUBLIC_TURSO_DATABASE_URL!,
  authToken: import.meta.env.PUBLIC_TURSO_AUTH_TOKEN!,
});

// 1️⃣ GraphQL schema
const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Game {
      id: String!
      name: String!
      description: String!
      icon: String!
      finished: Boolean!
    }

    type Query {
      game(id: String): Game
      games: [Game!]!
    }
  `,
  resolvers: {
    Query: {
      game: async (_parent, { id }) => {
        // Ensure table exists

        // Fetch game by id
        const row = await conn.execute({
          sql: "SELECT * FROM games WHERE id = ?",
          args: [id],
        });
        if (!row) return null;
        return { ...row.rows[0], finished: Boolean(row.rows) };
      },

      games: async () => {

        const result = await conn.execute({ sql: "SELECT * FROM games" });
        if (!result) return [];

        return result.rows.map((game) => ({
          ...game,
          finished: Boolean(game.finished),
        }));
      },
    },
  },
});

// 2️⃣ Create Yoga instance
const yoga = createYoga({
  schema,
  graphqlEndpoint: "/api/GameStorage",
  fetchAPI: { Request, Response }, // Important for Edge runtime
});

// 3️⃣ Wrap in QwikCity's request handler
export const onRequest: RequestHandler = async ({ request, send }) => {
  const response = await yoga.fetch(request);
  send(response);
};
