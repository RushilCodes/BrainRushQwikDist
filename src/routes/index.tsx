/* eslint-disable qwik/jsx-img */
/* eslint-disable qwik/no-use-visible-task */
import {
  component$,
  useSignal,
  useVisibleTask$,
  Resource,
} from "@builder.io/qwik";
import { routeLoader$, type DocumentHead, Link } from "@builder.io/qwik-city";
import Swal from "sweetalert2";
import { useSession } from "~/routes/plugin@auth";
import { User } from "@auth/qwik";
import DocumentHeader from "~/components/DocumentHeader";
import Footer from "~/components/Footer";
import { createClient } from "@libsql/client";

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

export interface Game {
  name: string;
  description: string;
  finished?: boolean;
}

export const useGameData = routeLoader$<Game[]>(async () => {
  const conn = createClient({
    url: import.meta.env.PUBLIC_TURSO_DATABASE_URL!,
    authToken: import.meta.env.PUBLIC_TURSO_AUTH_TOKEN!,
  });

    const result = await conn.execute("SELECT * FROM games");
    if (!result) return [];

  // if (!result.rows.data || !json.data.games) {
  //   throw new Error("Failed to load games");
  // }

  // return result.rows.games as Game[];
  return result.rows as unknown as Game[]
});

export default component$(() => {
  const gamesToShow = useSignal(8);
  const searchQuery = useSignal("");
  const gameData = useGameData();
  const session = useSession();

  useVisibleTask$(() => {
    localStorage.setItem("gamecode", "");
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

  return (
    <>
      <NameCollector />
      <DocumentHeader Homepage={true} />
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
                    key={game.id}
                    href={`/game/${game.id}`}
                    class="block w-full transform cursor-pointer rounded-lg border border-gray-100 bg-white p-5 pt-10 pb-5 text-left shadow transition-transform hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    aria-label={`Play ${game.name}`}
                  >
                    <img
                      src={"/games/" + game.icon.toLocaleLowerCase()}
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
      <Footer privacy={true} toc={true} />
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
