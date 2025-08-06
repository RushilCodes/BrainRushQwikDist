import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
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

const providers = [
  { id: "google", Icon: SiGoogle, name: "Google", color: "text-red-500" },
  { id: "apple", Icon: SiApple, name: "Apple", color: "text-black" },
  { id: "discord", Icon: SiDiscord, name: "Discord", color: "text-indigo-500" },
  {
    id: "facebook",
    Icon: SiFacebook,
    name: "Facebook",
    color: "text-blue-600",
  },
  {
    id: "instagram",
    Icon: SiInstagram,
    name: "Instagram",
    color: "text-pink-500",
  },
  { id: "reddit", Icon: SiReddit, name: "Reddit", color: "text-orange-500" },
  {
    id: "microsoft",
    Icon: SiMicrosoft,
    name: "Microsoft",
    color: "text-blue-700",
  },
];

export default component$(() => {
  const signInSig = useSignIn();

  return (
    <div class="flex min-h-screen items-center justify-center bg-white px-4">
      <div class="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-xl">
        <h1 class="text-center text-3xl font-bold text-gray-800">
          Login to Brain Rush
        </h1>
        <p class="text-center text-gray-500">
          Choose your preferred login provider
        </p>

        <div class="space-y-4">
          {signInSig ? (
            providers.map(({ id, Icon, name, color }) => (
              <Form action={signInSig} key={id}>
                <input type="hidden" name="providerId" value={id} />
                <input type="hidden" name="options.redirectTo" value="/" />
                <button
                  type="submit"
                  class={`flex w-full transform items-center justify-center gap-3 rounded-xl border border-gray-200 px-4 py-2 font-medium shadow-sm transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95 ${color}`}
                >
                  <Icon class="h-5 w-5" />
                  <span>Continue with {name}</span>
                </button>
              </Form>
            ))
          ) : (
            <p class="text-center text-red-500">Auth not initialized yet…</p>
          )}
        </div>

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
    </div>
  );
});
