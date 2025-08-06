import { QwikAuth$ } from "@auth/qwik";
import Google from "@auth/qwik/providers/google";
import apple from "@auth/qwik/providers/apple";
import discord from "@auth/qwik/providers/discord";
import facebook from "@auth/qwik/providers/facebook";
import instagram from "@auth/qwik/providers/instagram";
import reddit from "@auth/qwik/providers/reddit";
import microsoft from "@auth/qwik/providers/microsoft-entra-id";
// import mail from "@auth/qwik/providers/email"
// import Credentials from "@auth/qwik/providers/credentials";
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter";
import redis from "~/lib/redis";

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => ({
    allowDangerousEmailAccountLinking: true,
    providers: [
      Google({
        async profile(profile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          };
        },
      }),
      apple,
      discord({
        clientId: import.meta.env.AUTH_DISCORD_ID,
        clientSecret: import.meta.env.AUTH_DISCORD_SECRET,
        authorization: {
          params: {
            scope: "identify email", // 👈 This is required!
          },
        },
        async profile(profile) {
          const image = profile.avatar
            ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
            : `https://cdn.discordapp.com/embed/avatars/${Number(profile.discriminator) % 5}.png`;

          return {
            id: profile.id,
            name: profile.username,
            email: profile.email,
            image,
          };
        },
      }),
      facebook,
      instagram,
      reddit,
      microsoft({
        clientId: import.meta.env.AUTH_MICROSOFT_ENTRA_ID_ID,
        clientSecret: import.meta.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
        issuer: import.meta.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
        name: "Microsoft", // <-- this changes display name internally
      }),
    ],
    adapter: UpstashRedisAdapter(redis),
    // pages: {
    //   signIn: "/login/",
    // },
  }),
);
