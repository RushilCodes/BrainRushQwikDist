/* eslint-disable qwik/jsx-img */
import { component$ } from "@builder.io/qwik";
import Image from "~/assets/favicon.png?w=50&h=50&jsx"; // Replace path with your fallback image

export const ProfileImage = component$(({ session }: { session: any }) => {
  const imageUrl = session?.value?.user?.image;

  return imageUrl ? (
    <img
      src={imageUrl}
      alt="Profile"
      class="h-[32px] w-[32px] rounded-full border border-gray-300"
    />
  ) : (
    <Image
      alt="Default Profile"
      class="h-[32px] w-[32px] rounded-full border border-gray-300"
    />
  );
});
