import { component$ } from "@builder.io/qwik";
import Footer from "~/components/Footer";

export default component$(() => {
  return (
    <div class="mx-auto max-w-3xl p-6 leading-relaxed text-gray-800">
      <h1 class="mb-4 text-3xl font-bold">Privacy Policy</h1>
      <p>
        <strong>Effective Date:</strong> August 2, 2025
      </p>

      <h2 class="mt-6 mb-2 text-2xl font-semibold">
        1. Information We Collect
      </h2>
      <p>
        We do <strong>not</strong> collect any personally identifiable
        information directly from users. However, we may collect non-personal
        data automatically through:
      </p>
      <ul class="my-2 ml-6 list-disc">
        <li>Cookies or local storage (to save game scores or settings)</li>
        <li>Usage Analytics (e.g. Vercel Analytics or Google Analytics)</li>
        <li>IP address and device info (collected by analytics providers)</li>
      </ul>

      <h2 class="mt-6 mb-2 text-2xl font-semibold">
        2. How We Use Information
      </h2>
      <p>This data is used solely to:</p>
      <ul class="my-2 ml-6 list-disc">
        <li>Improve site performance and user experience</li>
        <li>Monitor uptime and debug issues</li>
        <li>Analyze aggregated usage trends</li>
      </ul>
      <p>
        We do <strong>not</strong> sell or share your personal data.
      </p>

      <h2 class="mt-6 mb-2 text-2xl font-semibold">
        3. Cookies and Local Storage
      </h2>
      <p>
        We use local storage to remember your preferences or game scores. These
        are stored <strong>only</strong> on your device and never sent to us.
      </p>

      <h2 class="mt-6 mb-2 text-2xl font-semibold">4. Third-Party Services</h2>
      <p>We may use trusted third-party services like:</p>
      <ul class="my-2 ml-6 list-disc">
        <li>Vercel Web Analytics</li>
        <li>Supabase or Vercel Blob for asset delivery</li>
      </ul>
      <p>Each service has its own privacy policy governing its practices.</p>

      <h2 class="mt-6 mb-2 text-2xl font-semibold">5. Children’s Privacy</h2>
      <p>
        Brain Rush is suitable for all ages. We do <strong>not</strong>{" "}
        knowingly collect data from users under the age of 13.
      </p>

      <h2 class="mt-6 mb-2 text-2xl font-semibold">6. Contact Us</h2>
      <p>
        If you have any questions, feel free to email us at{" "}
        <a href="mailto:support@brainrush.fun" class="text-blue-600 underline">
          support@brainrush.fun
        </a>
        .
      </p>
      <Footer privacy={false} />
    </div>
  );
});
