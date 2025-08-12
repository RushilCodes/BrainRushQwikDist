import { component$ } from "@builder.io/qwik";
import Footer from "~/components/Footer";

export default component$(() => {
  return (
    <div class="mx-auto max-w-3xl px-4 py-10 text-gray-800">
      <h1 class="mb-6 text-3xl font-bold">Terms and Conditions</h1>

      <p class="mb-4">
        Welcome to BrainRush. These terms and conditions outline the rules and
        regulations for the use of our website located at https://brainrush.fun.
      </p>

      <h2 class="mt-6 mb-2 text-xl font-semibold">1. Acceptance of Terms</h2>
      <p class="mb-4">
        By accessing or using BrainRush, you agree to be bound by these Terms.
        If you disagree with any part, please do not use the site.
      </p>

      <h2 class="mt-6 mb-2 text-xl font-semibold">2. Intellectual Property</h2>
      <p class="mb-4">
        All content, features, and functionality are owned by BrainRush or its
        licensors and are protected by copyright, trademark, and other laws.
      </p>

      <h2 class="mt-6 mb-2 text-xl font-semibold">3. User Conduct</h2>
      <p class="mb-4">
        You agree not to use the site in a way that may harm the service or
        other users. No cheating, scraping, or abuse of our systems.
      </p>

      <h2 class="mt-6 mb-2 text-xl font-semibold">
        4. Limitation of Liability
      </h2>
      <p class="mb-4">
        BrainRush is not liable for any damages arising out of the use or
        inability to use the service.
      </p>

      <h2 class="mt-6 mb-2 text-xl font-semibold">5. Changes</h2>
      <p class="mb-4">
        We may update these Terms from time to time. Continued use of the
        service means you accept the changes.
      </p>

      <h2 class="mt-6 mb-2 text-xl font-semibold">6. Contact</h2>
      <p>
        If you have any questions about these Terms, please contact us at{" "}
        <a href="mailto:support@brainrush.fun" class="text-blue-600 underline">
          support@brainrush.fun
        </a>
        .
      </p>
      <Footer toc={false} />
    </div>
  );
});
