// src/routes/api/streak/+server.ts

import { type RequestHandler } from '@builder.io/qwik-city';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: 'https://adjusted-perch-6686.upstash.io',
  token: 'ARoeAAIjcDFlOTIzNDg4MjkyOWE0ZmU2ODFhOTYyYWI4YTVjNzM5Y3AxMA',
})

function isNextDay(lastDate: string, today: string) {
  const last = new Date(lastDate);
  const curr = new Date(today);
  const diff = (curr.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
  return diff === 1;
}

export const onPost: RequestHandler = async ({ request, json }) => {
  const { username } = await request.json();

  if (!username) {
    json(400, { error: 'Username is required.' });
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  const key = `streak:${username}`;

  const existing = await redis.hgetall<{
    streak: number;
    lastDate: string;
  }>(key);

  if (existing?.lastDate === today) {
    json(200, { message: 'Already marked today.', streak: existing.streak });
    return;
  }

  let streak = 1;

  if (existing?.lastDate && isNextDay(existing.lastDate, today)) {
    streak = (existing.streak || 0) + 1;
  }

  await redis.hmset(key, { streak, lastDate: today });

  json(200, {
    message: existing?.streak ? 'Streak updated!' : 'Streak started!',
    streak,
    lastUpdated: today,
  });
};

export const onGet: RequestHandler = async ({ url, json }) => {
  const username = url.searchParams.get('username');

  if (!username) {
    json(400, { error: 'Username is required.' });
    return;
  }

  const key = `streak:${username}`;
  const data = await redis.hgetall<{
    streak: number;
    lastDate: string;
  }>(key);

  if (!data || Object.keys(data).length === 0) {
    json(200, { message: 'No streak found.', streak: 0 });
    return;
  }

  json(200, {
    message: 'Streak fetched.',
    streak: data.streak,
    lastDate: data.lastDate,
  });
};
