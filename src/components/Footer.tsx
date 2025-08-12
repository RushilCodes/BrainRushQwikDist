import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface FooterDisplayBools {
  privacy?: boolean;
  toc?: boolean;
}

export default component$(
  ({ privacy = true, toc = true }: FooterDisplayBools) => {
    return (
      <footer class="fixed bottom-0 left-0 w-full bg-white pt-10 pb-6 text-center text-sm text-gray-500">
        © 2025 Brain Rush — Keep your mind sharp
        <div class="mt-2 flex justify-center gap-6 text-sm">
          {privacy ? (
            <Link
              href="/Privacy"
              class="hover:underline focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Privacy Policy
            </Link>
          ) : null}
          {toc ? (
            <Link
              href="/Toc"
              class="hover:underline focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Terms & Conditions
            </Link>
          ) : null}
        </div>
      </footer>
    );
  },
);
