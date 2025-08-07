import { type RequestHandler } from "@builder.io/qwik-city";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "node:fs/promises";
import path from "node:path";

const interRegularFontPath = path.resolve("public/fonts/Inter-Regular.ttf"); // Adjust if needed
const orbitronBoldFontPath = path.resolve("public/fonts/Orbitron-Bold.ttf"); // Adjust if needed

export const onGet: RequestHandler = async ({ query, send }) => {
  const username = query.get("username") ?? "Player";
  const score = query.get("score") ?? "0";
  const game = query.get("game") ?? "Game";
  const interRegularFontData = await fs.readFile(interRegularFontPath);
  const orbitronBoldFontData = await fs.readFile(orbitronBoldFontPath);

const svg = await satori(
  {
    type: "div",
    props: {
      style: {
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "radial-gradient(circle at top left, #0f0c29, #302b63, #24243e)",
        color: "white",
        fontFamily: "Inter",
        padding: "40px",
        boxSizing: "border-box",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              fontSize: "64px",
              fontWeight: "900",
              fontFamily: "Orbitron",
              background: "linear-gradient(90deg, #00ffe7, #8a2be2, #ff00ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textTransform: "uppercase",
              letterSpacing: "4px",
              textShadow: "0 0 12px rgba(0,255,231,0.3)",
            },
            children: `${game} Complete!`,
          },
        },
        {
          type: "div",
          props: {
            style: {
              fontSize: "42px",
              marginTop: "40px",
              fontWeight: "bold",
              fontFamily: "Orbitron",
              letterSpacing: "2px",
              textTransform: "uppercase",
              background: "linear-gradient(90deg, #ff004f, #00ffe7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow:
                "1px 0 #ff00ff, -1px 0 #00ffee, 0 0 6px rgba(255,255,255,0.3)",
              transform: "rotate(-1deg)",
            },
            children: `${username} scored:`,
          },
        },
        {
          type: "div",
          props: {
            style: {
              fontSize: "96px",
              fontWeight: "900",
              marginTop: "20px",
              padding: "20px 60px",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "16px",
              border: "2px solid rgba(255, 255, 255, 0.1)",
              color: "#ffffff",
              backdropFilter: "blur(10px)",
              boxShadow: "0 0 20px rgba(255,255,255,0.2)",
              letterSpacing: "6px",
              textShadow: "0 0 12px rgba(255,255,255,0.4)",
              fontFamily: "Orbitron",
              transform: "skewX(-5deg)",
            },
            children: score,
          },
        },
        {
          type: "div",
          props: {
            style: {
              fontSize: "28px",
              marginTop: "60px",
              fontFamily: "Inter",
              color: "rgba(255, 255, 255, 0.4)",
              letterSpacing: "1px",
              textShadow: "0 0 4px rgba(255,255,255,0.2)",
            },
            children: "come play too → brainrush.fun",
          },
        },
      ],
    },
  },
  {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Inter",
        data: interRegularFontData,
        weight: 400,
        style: "normal",
      },
      {
        name: "Orbitron",
        data: orbitronBoldFontData,
        weight: 900,
        style: "normal",
      },
    ],
  }
);

const png = new Resvg(svg).render().asPng();

  // Set content-type manually
  send(200, png);
};
