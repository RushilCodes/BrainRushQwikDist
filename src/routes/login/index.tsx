import { component$ } from "@builder.io/qwik";
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
import Footer from "~/components/Footer";
import DocumentHeader from "~/components/DocumentHeader";

const providers = [
  {
    id: "google",
    Icon: SiGoogle,
    name: "Google",
    color: "text-red-500",
  },
  {
    id: "apple",
    Icon: SiApple,
    name: "Apple",
    color: "text-black",
  },
  {
    id: "discord",
    Icon: SiDiscord,
    name: "Discord",
    color: "text-indigo-500",
  },
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
  {
    id: "reddit",
    Icon: SiReddit,
    name: "Reddit",
    color: "text-orange-500",
  },
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
    <>
      <DocumentHeader />
      <div class="flex min-h-screen items-center justify-center bg-white px-4">
        <div class="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-xl">
          <h1 class="text-center text-3xl font-bold text-gray-800">
            Login to Brain Rush
          </h1>
          <p class="text-center text-gray-500">
            Choose your preferred login provider
          </p>

          <div class="space-y-4">
            {providers.map(({ id, Icon, name, color }) => (
              <button
                key={id}
                type="submit"
                class={`flex w-full transform items-center justify-center gap-3 rounded-xl border border-gray-200 px-4 py-2 font-medium shadow-sm transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95 ${color}`}
                onClick$={() => {
                  signInSig.submit({
                    providerId: id,
                    options: {
                      redirectTo: `/`,
                    },
                  });
                }}
              >
                <Icon class="h-5 w-5" />
                <span>Continue with {name}</span>
              </button>
            ))}
          </div>
          <Footer toc></Footer>
        </div>
      </div>
    </>
  );
});
