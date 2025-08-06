/* eslint-disable qwik/jsx-img */
import { component$ } from "@builder.io/qwik";
import Image from "../../../public/favicon.webp?w=32&h=32&jsx"; // Replace path with your fallback image

export const ProfileImage = component$(({ session }: { session: any }) => {
  const imageUrl = session?.value?.user?.image;

  return imageUrl ? (
    <img
      src={imageUrl}
      alt="Profile"
      class="h-8 w-8 rounded-full border border-gray-300"
    />
  ) : (
    <Image
      alt="Default Profile"
      class="h-8 w-8 rounded-full border border-gray-300"
    />
  );
});
