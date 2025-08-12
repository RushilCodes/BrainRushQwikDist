import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import Favicon from "~/assets/favicon.png?quality=100&w=70&h=70&jsx";
import swal from "sweetalert2";
import { Form, Link } from "@builder.io/qwik-city";
import { useSession, useSignOut } from "~/routes/plugin@auth";
import { ProfileImage } from "~/components/Profile";

export default component$(({ Homepage = false }: { Homepage?: boolean }) => {
  const showMenu = useSignal(false);
  const session = useSession();
  const signOutSig = useSignOut();

  // eslint-disable-next-line qwik/no-use-visible-task
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
      <header class="sticky top-0 z-10 flex items-center justify-between bg-[#f7f6f6] px-6 py-4 shadow-md">
        <div class="flex items-center space-x-3">
          <Favicon
            alt="Brain Rush Logo"
            loading="eager"
            fetchPriority="high"
            class="h-[36px] w-[36px] rounded-full"
          />
          <h1 class="hidden text-2xl font-bold tracking-tight text-blue-700 lg:block">
            Brain Rush
          </h1>
        </div>
        <div class="group sticky top-16 z-10 flex items-center justify-around px-4 py-3 pr-6">
          {Homepage ? (
            <>
              {/* Streak */}
              <button
                class="group flex flex-col items-center pr-10 text-gray-600 transition hover:text-orange-500"
                onClick$={() =>
                  swal.fire(
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
                  swal.fire(
                    "Coming Soon!",
                    "Favorites system on the way!",
                    "info",
                  )
                }
              >
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span class="mt-1 text-xs">Star</span>
              </button>
            </>
          ) : (
            <div class="flex items-center gap-3">
              <Link
                href="/"
                class="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50 hover:text-blue-700"
                aria-label="Go back to homepage"
              >
                <svg
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                Back
              </Link>
            </div>
          )}
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
                  <Form action={signOutSig}>
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
                <Link
                  href="/login"
                  class="block px-4 py-2 text-gray-700 transition hover:bg-gray-100"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
});
