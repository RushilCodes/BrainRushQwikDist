/* eslint-disable qwik/jsx-img */
/* eslint-disable qwik/no-use-visible-task */
import {
  component$,
  useSignal,
  useVisibleTask$,
  Resource,
} from "@builder.io/qwik";
import {
  routeLoader$,
  type DocumentHead,
  Form,
  Link,
} from "@builder.io/qwik-city";
import Swal from "sweetalert2";
import { useSession } from "~/routes/plugin@auth";
import { useSignOut } from "./plugin@auth";
import { User } from "@auth/qwik";
import Favicon from "../../public/favicon.webp?quality=100&w=36&h=36&jsx";
import { ProfileImage } from "~/components/profile/profile";

export interface Game {
  id: string;
  name: string;
  icon: string;
  description: string;
  finished?: boolean;
}

function mail(name: string, email: string = name) {
  const url = "https://brainrush.fun/api/mail";

  const dataToSend = {
    email: "rushilcodes@gmail.com",
    subject: `email: ${email} name: ${name}`,
    html: `
<div style="font-family: sans-serif; padding: 20px; border-radius: 12px; background-color: #f4f4f5; color: #111827;">
  <h2 style="color: #2563eb;">Welcome, ${name}!</h2>
  <p>We've successfully received your email: <strong>${email}</strong>.</p>
  <p>Thanks for connecting with Brain Rush. We’ll be in touch soon!</p>
  <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
  <p style="font-size: 0.9em; color: #6b7280;">If you didn’t request this, please ignore this message.</p>
</div>
  `,
  };

  fetch(url, {
    method: "POST", // Specifies the HTTP method as POST
    headers: {
      "Content-Type": "application/json", // Indicates the body content type
    },
    body: JSON.stringify(dataToSend), // Converts the data object to a JSON string
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Parses the JSON response
    })
    .then((data) => {
      console.log("Success:", data); // Handles the successful response data
    })
    .catch((error) => {
      console.error("Error:", error); // Handles any errors during the fetch operation
    });
}

export const NameCollector = component$(() => {
  const session = useSession();

  useVisibleTask$(() => {
    const storedName = localStorage.getItem("username");
    if (storedName != "undefined" && storedName) {
      mail(
        session.value?.user?.name as string,
        session.value?.user?.email as string,
      );
      return;
    }
    if (parseInt(localStorage.getItem("totalPlaytime") as string) > 300) {
      Swal.fire({
        title: "Welcome!",
        html: `<span style="color: #8b5cf6; font-weight: bold; text-shadow: 0 0 8px #a78bfa;">login and save your progress</span>?`,
        icon: "question",
        confirmButtonText: "Login",
        showCancelButton: true,
        denyButtonText: "Later",
        customClass: {
          confirmButton:
            "bg-white pr-2 text-purple-600 border border-gray-300 hover:text-purple-700 hover:border-gray-400 px-4 py-2 rounded font-medium",
          cancelButton:
            "bg-white text-gray-600 border border-gray-300 hover:text-gray-800 hover:border-gray-400 px-4 py-2 rounded",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (!result.isConfirmed) localStorage.setItem("totalPlaytime", "0");
      });
    }
  });

  return null;
});

export const useGameData = routeLoader$<Game[]>(async () => {
  const url =
    "https://1vnkxjbyodanjftq.public.blob.vercel-storage.com/Static/gameData.json";
  const res = await fetch(url);
  return res.json();
});

export default component$(() => {
  const gamesToShow = useSignal(8);
  const searchQuery = useSignal("");
  const gameData = useGameData();
  const session = useSession();
  const signOutSig = useSignOut();
  const showMenu = useSignal(false);

  useVisibleTask$(() => {
    const userData: User | undefined = session.value?.user;
    if (
      session.value?.user?.name != "" &&
      session.value?.user?.name != "undefined" &&
      session.value?.user?.name != "undefined"
    ) {
      localStorage.setItem("username", userData?.name as string);
    }
  });

  useVisibleTask$(({ cleanup }) => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          gamesToShow.value += 8;
        }
      }
    });

    const el = document.getElementById("lazy-sentinel");
    if (el) observer.observe(el);

    cleanup(() => observer.disconnect());
  });

  useVisibleTask$(() => {
    const closeOnOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest("#profile-button") &&
        !target.closest("#profile-dropdown")
      ) {
        showMenu.value = false;
      }
    };
    document.addEventListener("click", closeOnOutside);
    return () => document.removeEventListener("click", closeOnOutside);
  });

  return (
    <>
      <NameCollector />

      <header class="sticky top-0 z-10 flex items-center justify-between bg-[#f7f6f6] px-6 py-4 shadow-md">
        <div class="flex items-center space-x-3">
          <Favicon
            alt="Brain Rush Logo"
            loading="eager"
            fetchPriority="high"
            class="rounded-full"
          />
          <h1 class="hidden text-2xl font-bold tracking-tight text-blue-700 lg:block">
            Brain Rush
          </h1>
        </div>

        <div class="group sticky top-16 z-10 flex items-center justify-around border-t bg-white px-4 py-3 shadow-sm">
          {/* Streak */}
          <button
            class="group flex flex-col items-center pr-10 text-gray-600 transition hover:text-orange-500"
            onClick$={() =>
              Swal.fire(
                "Coming Soon!",
                "Streak tracking is on the way!",
                "info",
              )
            }
          >
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.5 2.5C13 4.5 14.5 6 14.5 6s-3.5-1-5.5-5c-1 3 0 6-2 8-2 2.5-1.5 6 1 8 3 2.5 9 1.5 9-4 0-2-1.5-3.5-3-5z" />
            </svg>
            <span class="mt-1 text-xs">Streak</span>
          </button>

          {/* Star */}
          <button
            class="flex flex-col items-center pr-10 text-gray-600 transition hover:text-yellow-500"
            onClick$={() =>
              Swal.fire("Coming Soon!", "Favorites system on the way!", "info")
            }
          >
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span class="mt-1 text-xs">Star</span>
          </button>

          {/* Profile Dropdown (fixed hover) */}
          <div
            class="group relative"
            onMouseEnter$={() => (showMenu.value = true)}
            onMouseLeave$={() => (showMenu.value = false)}
          >
            {/* Profile Button */}
            <button
              id="profile-button"
              class="rounded-full transition-transform hover:scale-105 focus:outline-none"
              onClick$={() => (showMenu.value = !showMenu.value)}
            >
              <ProfileImage session={session} />
            </button>

            {/* Dropdown */}
            <div
              id="profile-dropdown"
              class={[
                "absolute right-0 z-50 mt-2 w-40 origin-top-right rounded-xl bg-white shadow-md transition-all duration-200",
                showMenu.value
                  ? "visible scale-100 opacity-100"
                  : "invisible scale-95 opacity-0",
              ]}
            >
              {session.value?.user ? (
                <>
                  <div class="px-4 py-2 text-sm text-gray-700">
                    {session.value.user.name || "Logged In"}
                  </div>
                  <Form
                    action={signOutSig}
                    onSubmit$={() =>
                      window.location.replace("https://brainrush.fun")
                    }
                  >
                    <button
                      type="submit"
                      class="w-full px-4 py-2 text-left text-gray-700 transition hover:bg-gray-100"
                    >
                      Sign out
                      {}
                    </button>
                  </Form>
                </>
              ) : (
                <a
                  href="/login"
                  class="block px-4 py-2 text-gray-700 transition hover:bg-gray-100"
                >
                  Sign in
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <main class="mx-auto h-full min-h-screen w-full max-w-7xl min-w-[100%] px-4 py-8 sm:px-8 md:min-w-0">
        <div class="mb-6 flex items-center gap-3 rounded-md border border-gray-200 px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search games..."
            bind:value={searchQuery}
            class="w-full bg-transparent text-sm focus:outline-none"
          />
        </div>

        <Resource
          value={gameData}
          onPending={() => (
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <div class="h-64 w-full animate-pulse rounded-lg bg-gray-100"></div>
            </div>
          )}
          onRejected={(error) => (
            <div class="font-semibold text-red-600">Error: {error.message}</div>
          )}
          onResolved={(games: Game[]) => {
            const filtered = games.filter(
              (g) =>
                g.finished &&
                g.name
                  .toLowerCase()
                  .includes(searchQuery.value.trim().toLowerCase()),
            );
            return (
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filtered.slice(0, gamesToShow.value).map((game) => (
                  <Link
                    prefetch={true}
                    key={game.id}
                    href={`/game/${game.id}`}
                    class="block w-full transform cursor-pointer rounded-lg border border-gray-100 bg-white p-5 pt-10 pb-5 text-left shadow transition-transform hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    aria-label={`Play ${game.name}`}
                  >
                    <img
                      src={game.icon}
                      alt={`${game.name} Icon`}
                      class="h-36 w-full object-cover"
                      decoding="async"
                      fetchPriority="high"
                    />
                    <h2 class="mb-2 pt-5 text-xl font-bold text-gray-800">
                      {game.name}
                    </h2>
                    <p class="text-sm text-gray-600">{game.description}</p>
                  </Link>
                ))}
                <div id="lazy-sentinel" class="h-1 w-full"></div>
              </div>
            );
          }}
        />
      </main>

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
    </>
  );
});

export const head: DocumentHead = {
  title: "Play Brain Games Online | Weekly Memory & Logic Puzzles",
  meta: [
    {
      name: "description",
      content:
        "Challenge your brain with memory games, logic puzzles, and focus tests. New games added weekly to keep your mind sharp. Start your brain training now!",
    },
    {
      name: "keywords",
      content:
        "brain games, free brain puzzles, memory training, logic games, focus challenges, cognitive training, online brain games, brain teaser, IQ test games, brain rush games",
    },
  ],
};
