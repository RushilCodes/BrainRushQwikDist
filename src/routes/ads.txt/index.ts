import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ send, headers }) => {
  const res = await fetch("https://srv.adstxtmanager.com/19390/brainrush.fun");
  const content = await res.text();

  headers.set("Content-Type", "text/plain");
  headers.set("Cache-Control", "public, max-age=300");

  send(200, content);
};
