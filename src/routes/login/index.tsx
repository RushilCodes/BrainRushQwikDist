import { component$ } from "@builder.io/qwik";
import { Form, Link } from "@builder.io/qwik-city";
import { useSignIn } from "~/routes/plugin@auth";

import {
  SiGoogle,
  SiApple,
  SiDiscord,
  SiFacebook,
  SiInstagram,
  SiReddit,
  SiMicrosoft,
} from "@qwikest/icons/simpleicons";

// Provider definitions
const providers = [
  { id: "google", Icon: SiGoogle, name: "Google", color: "text-red-500" },
  { id: "apple", Icon: SiApple, name: "Apple", color: "text-black" },
  { id: "discord", Icon: SiDiscord, name: "Discord", color: "text-indigo-500" },
  { id: "facebook", Icon: SiFacebook, name: "Facebook", color: "text-blue-600" },
  { id: "instagram", Icon: SiInstagram, name: "Instagram", color: "text-pink-500" },
  { id: "reddit", Icon: SiReddit, name: "Reddit", color: "text-orange-500" },
  { id: "microsoft", Icon: SiMicrosoft, name: "Microsoft", color: "text-blue-700" },
];

export default component$(() => {
  const signInSig = useSignIn();

  return (
    <div class="min-h-screen bg-gradient-to-br from-[#111] via-[#1e1e1e] to-[#111] flex flex-col items-center justify-center px-4 py-8 text-white">
      <h1 class="text-3xl md:text-4xl font-bold mb-8 text-center">
        Sign in to <span class="text-green-400">BrainRush</span>
      </h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl">
        {providers.map(({ id, Icon, name, color }) => (
          <Form key={id} action={signInSig} class="w-full">
            <input type="hidden" name="providerId" value={id} />
            <input type="hidden" name="options.redirectTo" value="/" />
            <button
              class={`flex items-center justify-center gap-3 w-full px-5 py-3 rounded-xl bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-200 ${color}`}
            >
              <Icon class="w-5 h-5" />
              <span class="font-semibold">{name}</span>
            </button>
          </Form>
        ))}
      </div>

      <p class="mt-10 text-sm text-gray-400">
        Having trouble?{" "}
        <Link href="/support" class="underline hover:text-white">
          Contact support
        </Link>
      </p>

        <footer class="pt-10 pb-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © 2025 Brain Rush — Keep your mind sharp
          <div class="mt-2 flex justify-center gap-6 text-sm">
            <a
              href="/privacy"
              class="hover:underline focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Privacy Policy
            </a>
            <a
              href="/Toc"
              class="hover:underline focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Terms & Conditions
            </a>
          </div>
        </footer>
    </div>

  );
});
