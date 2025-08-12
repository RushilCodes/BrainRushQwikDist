import { Redis } from '@upstash/redis';

export default new Redis({
  url: import.meta.env.PUBLIC_KV_REST_API_URL,
  token: import.meta.env.PUBLIC_KV_REST_API_TOKEN,
})