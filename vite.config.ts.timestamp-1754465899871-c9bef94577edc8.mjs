// vite.config.ts
import { defineConfig } from "file:///C:/Users/Rushi/Favorites/Projects/BrainRush-Qwik/node_modules/vite/dist/node/index.js";
import { qwikVite } from "file:///C:/Users/Rushi/Favorites/Projects/BrainRush-Qwik/node_modules/@builder.io/qwik/dist/optimizer.mjs";
import { qwikCity } from "file:///C:/Users/Rushi/Favorites/Projects/BrainRush-Qwik/node_modules/@builder.io/qwik-city/lib/vite/index.mjs";
import tsconfigPaths from "file:///C:/Users/Rushi/Favorites/Projects/BrainRush-Qwik/node_modules/vite-tsconfig-paths/dist/index.mjs";

// package.json
var package_default = {
  name: "my-qwik-empty-starter",
  description: "Blank project with routing included",
  engines: {
    node: ">=21.0.0",
  },
  "engines-annotation":
    "Mostly required by sharp which needs a Node-API v9 compatible runtime",
  private: true,
  type: "module",
  scripts: {
    build: "qwik build",
    "build.client": "vite build",
    "build.preview": "vite build --ssr src/entry.preview.tsx",
    "build.server": "vite build -c adapters/vercel-edge/vite.config.ts",
    "build.types": "tsc --incremental --noEmit",
    deploy: "vercel deploy --prod",
    dev: "vite --mode ssr",
    "dev.debug":
      "node --inspect-brk ./node_modules/vite/bin/vite.js --mode ssr --force",
    fmt: "prettier --write .",
    "fmt.check": "prettier --check .",
    lint: 'eslint "src/**/*.ts*"',
    preview: "qwik build preview && vite preview --open",
    start: "vite --open --mode ssr",
    qwik: "qwik",
  },
  devDependencies: {
    "@auth/qwik": "0.5.4",
    "@builder.io/qwik": "^1.15.0",
    "@builder.io/qwik-city": "^1.15.0",
    "@eslint/js": "latest",
    "@qwik.dev/partytown": "^0.11.1",
    "@qwikest/icons": "^0.0.13",
    "@tailwindcss/vite": "^4.0.0",
    "@types/node": "20.14.11",
    eslint: "9.25.1",
    "eslint-plugin-qwik": "^1.15.0",
    globals: "16.0.0",
    prettier: "3.3.3",
    "prettier-plugin-tailwindcss": "^0.6.11",
    tailwindcss: "^4.0.0",
    typescript: "5.4.5",
    "typescript-eslint": "8.26.1",
    "typescript-plugin-css-modules": "latest",
    undici: "*",
    vercel: "^44.6.6",
    vite: "5.3.5",
    "vite-tsconfig-paths": "^4.2.1",
  },
  dependencies: {
    "@auth/upstash-redis-adapter": "^2.10.0",
    "@capacitor/core": "^7.4.2",
    "@capacitor/network": "^7.0.1",
    "@capacitor/screen-orientation": "^7.0.1",
    "@capacitor/toast": "^7.0.1",
    "@emailjs/browser": "^4.4.1",
    "@libsql/client": "^0.15.10",
    "@types/minimatch": "^6.0.0",
    "@upstash/redis": "^1.35.3",
    "@upstash/search": "^0.1.5",
    "@vercel/analytics": "^1.5.0",
    "@vercel/blob": "^1.1.1",
    "@vercel/speed-insights": "^1.2.0",
    "@vitejs/plugin-basic-ssl": "^2.1.0",
    emailjs: "^4.0.3",
    "emailjs-com": "^3.2.0",
    express: "^5.1.0",
    "fuse.js": "^7.1.0",
    ioredis: "^5.7.0",
    resend: "^4.7.0",
    sweetalert2: "^11.22.2",
  },
  trustedDependencies: [
    "@parcel/watcher",
    "@tailwindcss/oxide",
    "@vercel/speed-insights",
    "vercel",
  ],
};

// vite.config.ts
import tailwindcss from "file:///C:/Users/Rushi/Favorites/Projects/BrainRush-Qwik/node_modules/@tailwindcss/vite/dist/index.mjs";
import { partytownVite } from "file:///C:/Users/Rushi/Favorites/Projects/BrainRush-Qwik/node_modules/@qwik.dev/partytown/utils/index.mjs";
import { join } from "path";
var __vite_injected_original_dirname =
  "C:\\Users\\Rushi\\Favorites\\Projects\\BrainRush-Qwik";
var { dependencies = {}, devDependencies = {} } = package_default;
errorOnDuplicatesPkgDeps(devDependencies, dependencies);
var vite_config_default = defineConfig(({ command, mode }) => {
  return {
    plugins: [
      qwikCity(),
      qwikVite(),
      tsconfigPaths({ root: "." }),
      tailwindcss(),
      partytownVite({
        dest: join(__vite_injected_original_dirname, "dist", "~partytown"),
      }),
    ],
    // This tells Vite which dependencies to pre-build in dev mode.
    optimizeDeps: {
      include: ["@auth/qwik"],
      exclude: [],
    },
    /**
     * This is an advanced setting. It improves the bundling of your server code. To use it, make sure you understand when your consumed packages are dependencies or dev dependencies. (otherwise things will break in production)
     */
    // ssr:
    //   command === "build" && mode === "production"
    //     ? {
    //         // All dev dependencies should be bundled in the server build
    //         noExternal: Object.keys(devDependencies),
    //         // Anything marked as a dependency will not be bundled
    //         // These should only be production binary deps (including deps of deps), CLI deps, and their module graph
    //         // If a dep-of-dep needs to be external, add it here
    //         // For example, if something uses `bcrypt` but you don't have it as a dep, you can write
    //         // external: [...Object.keys(dependencies), 'bcrypt']
    //         external: Object.keys(dependencies),
    //       }
    //     : undefined,
    server: {
      headers: {
        // Don't cache the server response in dev mode
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        // Do cache the server response in preview (non-adapter production build)
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
function errorOnDuplicatesPkgDeps(devDependencies2, dependencies2) {
  let msg = "";
  const duplicateDeps = Object.keys(devDependencies2).filter(
    (dep) => dependencies2[dep],
  );
  const qwikPkg = Object.keys(dependencies2).filter((value) =>
    /qwik/i.test(value),
  );
  msg = `Move qwik packages ${qwikPkg.join(", ")} to devDependencies`;
  if (qwikPkg.length > 0) {
    throw new Error(msg);
  }
  msg = `
    Warning: The dependency "${duplicateDeps.join(", ")}" is listed in both "devDependencies" and "dependencies".
    Please move the duplicated dependencies to "devDependencies" only and remove it from "dependencies"
  `;
  if (duplicateDeps.length > 0) {
    throw new Error(msg);
  }
}
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcUnVzaGlcXFxcRmF2b3JpdGVzXFxcXFByb2plY3RzXFxcXEJyYWluUnVzaC1Rd2lrXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxSdXNoaVxcXFxGYXZvcml0ZXNcXFxcUHJvamVjdHNcXFxcQnJhaW5SdXNoLVF3aWtcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL1J1c2hpL0Zhdm9yaXRlcy9Qcm9qZWN0cy9CcmFpblJ1c2gtUXdpay92aXRlLmNvbmZpZy50c1wiOy8qKlxuICogVGhpcyBpcyB0aGUgYmFzZSBjb25maWcgZm9yIHZpdGUuXG4gKiBXaGVuIGJ1aWxkaW5nLCB0aGUgYWRhcHRlciBjb25maWcgaXMgdXNlZCB3aGljaCBsb2FkcyB0aGlzIGZpbGUgYW5kIGV4dGVuZHMgaXQuXG4gKi9cbmltcG9ydCB7IGRlZmluZUNvbmZpZywgdHlwZSBVc2VyQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IHF3aWtWaXRlIH0gZnJvbSBcIkBidWlsZGVyLmlvL3F3aWsvb3B0aW1pemVyXCI7XG5pbXBvcnQgeyBxd2lrQ2l0eSB9IGZyb20gXCJAYnVpbGRlci5pby9xd2lrLWNpdHkvdml0ZVwiO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcbmltcG9ydCBwa2cgZnJvbSBcIi4vcGFja2FnZS5qc29uXCI7XG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSBcIkB0YWlsd2luZGNzcy92aXRlXCI7XG5pbXBvcnQgYmFzaWNTc2wgZnJvbSBcIkB2aXRlanMvcGx1Z2luLWJhc2ljLXNzbFwiO1xuaW1wb3J0IHsgcGFydHl0b3duVml0ZSB9IGZyb20gXCJAcXdpay5kZXYvcGFydHl0b3duL3V0aWxzXCI7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcbnR5cGUgUGtnRGVwID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbmNvbnN0IHsgZGVwZW5kZW5jaWVzID0ge30sIGRldkRlcGVuZGVuY2llcyA9IHt9IH0gPSBwa2cgYXMgYW55IGFzIHtcbiAgZGVwZW5kZW5jaWVzOiBQa2dEZXA7XG4gIGRldkRlcGVuZGVuY2llczogUGtnRGVwO1xuICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xufTtcbmVycm9yT25EdXBsaWNhdGVzUGtnRGVwcyhkZXZEZXBlbmRlbmNpZXMsIGRlcGVuZGVuY2llcyk7XG4vKipcbiAqIE5vdGUgdGhhdCBWaXRlIG5vcm1hbGx5IHN0YXJ0cyBmcm9tIGBpbmRleC5odG1sYCBidXQgdGhlIHF3aWtDaXR5IHBsdWdpbiBtYWtlcyBzdGFydCBhdCBgc3JjL2VudHJ5LnNzci50c3hgIGluc3RlYWQuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSk6IFVzZXJDb25maWcgPT4ge1xuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtcbiAgICAgIHF3aWtDaXR5KCksXG4gICAgICBxd2lrVml0ZSgpLFxuICAgICAgdHNjb25maWdQYXRocyh7IHJvb3Q6IFwiLlwiIH0pLFxuICAgICAgdGFpbHdpbmRjc3MoKSxcbiAgICAgIHBhcnR5dG93blZpdGUoeyBkZXN0OiBqb2luKF9fZGlybmFtZSwgXCJkaXN0XCIsIFwifnBhcnR5dG93blwiKSB9KSxcbiAgICBdLFxuICAgIC8vIFRoaXMgdGVsbHMgVml0ZSB3aGljaCBkZXBlbmRlbmNpZXMgdG8gcHJlLWJ1aWxkIGluIGRldiBtb2RlLlxuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgaW5jbHVkZTogW1wiQGF1dGgvcXdpa1wiXSxcbiAgICAgIGV4Y2x1ZGU6IFtdLFxuICAgIH0sXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBhbiBhZHZhbmNlZCBzZXR0aW5nLiBJdCBpbXByb3ZlcyB0aGUgYnVuZGxpbmcgb2YgeW91ciBzZXJ2ZXIgY29kZS4gVG8gdXNlIGl0LCBtYWtlIHN1cmUgeW91IHVuZGVyc3RhbmQgd2hlbiB5b3VyIGNvbnN1bWVkIHBhY2thZ2VzIGFyZSBkZXBlbmRlbmNpZXMgb3IgZGV2IGRlcGVuZGVuY2llcy4gKG90aGVyd2lzZSB0aGluZ3Mgd2lsbCBicmVhayBpbiBwcm9kdWN0aW9uKVxuICAgICAqL1xuICAgIC8vIHNzcjpcbiAgICAvLyAgIGNvbW1hbmQgPT09IFwiYnVpbGRcIiAmJiBtb2RlID09PSBcInByb2R1Y3Rpb25cIlxuICAgIC8vICAgICA/IHtcbiAgICAvLyAgICAgICAgIC8vIEFsbCBkZXYgZGVwZW5kZW5jaWVzIHNob3VsZCBiZSBidW5kbGVkIGluIHRoZSBzZXJ2ZXIgYnVpbGRcbiAgICAvLyAgICAgICAgIG5vRXh0ZXJuYWw6IE9iamVjdC5rZXlzKGRldkRlcGVuZGVuY2llcyksXG4gICAgLy8gICAgICAgICAvLyBBbnl0aGluZyBtYXJrZWQgYXMgYSBkZXBlbmRlbmN5IHdpbGwgbm90IGJlIGJ1bmRsZWRcbiAgICAvLyAgICAgICAgIC8vIFRoZXNlIHNob3VsZCBvbmx5IGJlIHByb2R1Y3Rpb24gYmluYXJ5IGRlcHMgKGluY2x1ZGluZyBkZXBzIG9mIGRlcHMpLCBDTEkgZGVwcywgYW5kIHRoZWlyIG1vZHVsZSBncmFwaFxuICAgIC8vICAgICAgICAgLy8gSWYgYSBkZXAtb2YtZGVwIG5lZWRzIHRvIGJlIGV4dGVybmFsLCBhZGQgaXQgaGVyZVxuICAgIC8vICAgICAgICAgLy8gRm9yIGV4YW1wbGUsIGlmIHNvbWV0aGluZyB1c2VzIGBiY3J5cHRgIGJ1dCB5b3UgZG9uJ3QgaGF2ZSBpdCBhcyBhIGRlcCwgeW91IGNhbiB3cml0ZVxuICAgIC8vICAgICAgICAgLy8gZXh0ZXJuYWw6IFsuLi5PYmplY3Qua2V5cyhkZXBlbmRlbmNpZXMpLCAnYmNyeXB0J11cbiAgICAvLyAgICAgICAgIGV4dGVybmFsOiBPYmplY3Qua2V5cyhkZXBlbmRlbmNpZXMpLFxuICAgIC8vICAgICAgIH1cbiAgICAvLyAgICAgOiB1bmRlZmluZWQsXG4gICAgc2VydmVyOiB7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIC8vIERvbid0IGNhY2hlIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgaW4gZGV2IG1vZGVcbiAgICAgICAgXCJDYWNoZS1Db250cm9sXCI6IFwicHVibGljLCBtYXgtYWdlPTBcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgICBwcmV2aWV3OiB7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIC8vIERvIGNhY2hlIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgaW4gcHJldmlldyAobm9uLWFkYXB0ZXIgcHJvZHVjdGlvbiBidWlsZClcbiAgICAgICAgXCJDYWNoZS1Db250cm9sXCI6IFwicHVibGljLCBtYXgtYWdlPTYwMFwiLFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xufSk7XG4vLyAqKiogdXRpbHMgKioqXG4vKipcbiAqIEZ1bmN0aW9uIHRvIGlkZW50aWZ5IGR1cGxpY2F0ZSBkZXBlbmRlbmNpZXMgYW5kIHRocm93IGFuIGVycm9yXG4gKiBAcGFyYW0ge09iamVjdH0gZGV2RGVwZW5kZW5jaWVzIC0gTGlzdCBvZiBkZXZlbG9wbWVudCBkZXBlbmRlbmNpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZXBlbmRlbmNpZXMgLSBMaXN0IG9mIHByb2R1Y3Rpb24gZGVwZW5kZW5jaWVzXG4gKi9cbmZ1bmN0aW9uIGVycm9yT25EdXBsaWNhdGVzUGtnRGVwcyhcbiAgZGV2RGVwZW5kZW5jaWVzOiBQa2dEZXAsXG4gIGRlcGVuZGVuY2llczogUGtnRGVwLFxuKSB7XG4gIGxldCBtc2cgPSBcIlwiO1xuICAvLyBDcmVhdGUgYW4gYXJyYXkgJ2R1cGxpY2F0ZURlcHMnIGJ5IGZpbHRlcmluZyBkZXZEZXBlbmRlbmNpZXMuXG4gIC8vIElmIGEgZGVwZW5kZW5jeSBhbHNvIGV4aXN0cyBpbiBkZXBlbmRlbmNpZXMsIGl0IGlzIGNvbnNpZGVyZWQgYSBkdXBsaWNhdGUuXG4gIGNvbnN0IGR1cGxpY2F0ZURlcHMgPSBPYmplY3Qua2V5cyhkZXZEZXBlbmRlbmNpZXMpLmZpbHRlcihcbiAgICAoZGVwKSA9PiBkZXBlbmRlbmNpZXNbZGVwXSxcbiAgKTtcbiAgLy8gaW5jbHVkZSBhbnkga25vd24gcXdpayBwYWNrYWdlc1xuICBjb25zdCBxd2lrUGtnID0gT2JqZWN0LmtleXMoZGVwZW5kZW5jaWVzKS5maWx0ZXIoKHZhbHVlKSA9PlxuICAgIC9xd2lrL2kudGVzdCh2YWx1ZSksXG4gICk7XG4gIC8vIGFueSBlcnJvcnMgZm9yIG1pc3NpbmcgXCJxd2lrLWNpdHktcGxhblwiXG4gIC8vIFtQTFVHSU5fRVJST1JdOiBJbnZhbGlkIG1vZHVsZSBcIkBxd2lrLWNpdHktcGxhblwiIGlzIG5vdCBhIHZhbGlkIHBhY2thZ2VcbiAgbXNnID0gYE1vdmUgcXdpayBwYWNrYWdlcyAke3F3aWtQa2cuam9pbihcIiwgXCIpfSB0byBkZXZEZXBlbmRlbmNpZXNgO1xuICBpZiAocXdpa1BrZy5sZW5ndGggPiAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gIH1cbiAgLy8gRm9ybWF0IHRoZSBlcnJvciBtZXNzYWdlIHdpdGggdGhlIGR1cGxpY2F0ZXMgbGlzdC5cbiAgLy8gVGhlIGBqb2luYCBmdW5jdGlvbiBpcyB1c2VkIHRvIHJlcHJlc2VudCB0aGUgZWxlbWVudHMgb2YgdGhlICdkdXBsaWNhdGVEZXBzJyBhcnJheSBhcyBhIGNvbW1hLXNlcGFyYXRlZCBzdHJpbmcuXG4gIG1zZyA9IGBcbiAgICBXYXJuaW5nOiBUaGUgZGVwZW5kZW5jeSBcIiR7ZHVwbGljYXRlRGVwcy5qb2luKFwiLCBcIil9XCIgaXMgbGlzdGVkIGluIGJvdGggXCJkZXZEZXBlbmRlbmNpZXNcIiBhbmQgXCJkZXBlbmRlbmNpZXNcIi5cbiAgICBQbGVhc2UgbW92ZSB0aGUgZHVwbGljYXRlZCBkZXBlbmRlbmNpZXMgdG8gXCJkZXZEZXBlbmRlbmNpZXNcIiBvbmx5IGFuZCByZW1vdmUgaXQgZnJvbSBcImRlcGVuZGVuY2llc1wiXG4gIGA7XG4gIC8vIFRocm93IGFuIGVycm9yIHdpdGggdGhlIGNvbnN0cnVjdGVkIG1lc3NhZ2UuXG4gIGlmIChkdXBsaWNhdGVEZXBzLmxlbmd0aCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgfVxufVxuIiwgIntcbiAgXCJuYW1lXCI6IFwibXktcXdpay1lbXB0eS1zdGFydGVyXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJCbGFuayBwcm9qZWN0IHdpdGggcm91dGluZyBpbmNsdWRlZFwiLFxuICBcImVuZ2luZXNcIjoge1xuICAgIFwibm9kZVwiOiBcIj49MjEuMC4wXCJcbiAgfSxcbiAgXCJlbmdpbmVzLWFubm90YXRpb25cIjogXCJNb3N0bHkgcmVxdWlyZWQgYnkgc2hhcnAgd2hpY2ggbmVlZHMgYSBOb2RlLUFQSSB2OSBjb21wYXRpYmxlIHJ1bnRpbWVcIixcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiYnVpbGRcIjogXCJxd2lrIGJ1aWxkXCIsXG4gICAgXCJidWlsZC5jbGllbnRcIjogXCJ2aXRlIGJ1aWxkXCIsXG4gICAgXCJidWlsZC5wcmV2aWV3XCI6IFwidml0ZSBidWlsZCAtLXNzciBzcmMvZW50cnkucHJldmlldy50c3hcIixcbiAgICBcImJ1aWxkLnNlcnZlclwiOiBcInZpdGUgYnVpbGQgLWMgYWRhcHRlcnMvdmVyY2VsLWVkZ2Uvdml0ZS5jb25maWcudHNcIixcbiAgICBcImJ1aWxkLnR5cGVzXCI6IFwidHNjIC0taW5jcmVtZW50YWwgLS1ub0VtaXRcIixcbiAgICBcImRlcGxveVwiOiBcInZlcmNlbCBkZXBsb3kgLS1wcm9kXCIsXG4gICAgXCJkZXZcIjogXCJ2aXRlIC0tbW9kZSBzc3JcIixcbiAgICBcImRldi5kZWJ1Z1wiOiBcIm5vZGUgLS1pbnNwZWN0LWJyayAuL25vZGVfbW9kdWxlcy92aXRlL2Jpbi92aXRlLmpzIC0tbW9kZSBzc3IgLS1mb3JjZVwiLFxuICAgIFwiZm10XCI6IFwicHJldHRpZXIgLS13cml0ZSAuXCIsXG4gICAgXCJmbXQuY2hlY2tcIjogXCJwcmV0dGllciAtLWNoZWNrIC5cIixcbiAgICBcImxpbnRcIjogXCJlc2xpbnQgXFxcInNyYy8qKi8qLnRzKlxcXCJcIixcbiAgICBcInByZXZpZXdcIjogXCJxd2lrIGJ1aWxkIHByZXZpZXcgJiYgdml0ZSBwcmV2aWV3IC0tb3BlblwiLFxuICAgIFwic3RhcnRcIjogXCJ2aXRlIC0tb3BlbiAtLW1vZGUgc3NyXCIsXG4gICAgXCJxd2lrXCI6IFwicXdpa1wiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBhdXRoL3F3aWtcIjogXCIwLjUuNFwiLFxuICAgIFwiQGJ1aWxkZXIuaW8vcXdpa1wiOiBcIl4xLjE1LjBcIixcbiAgICBcIkBidWlsZGVyLmlvL3F3aWstY2l0eVwiOiBcIl4xLjE1LjBcIixcbiAgICBcIkBlc2xpbnQvanNcIjogXCJsYXRlc3RcIixcbiAgICBcIkBxd2lrLmRldi9wYXJ0eXRvd25cIjogXCJeMC4xMS4xXCIsXG4gICAgXCJAcXdpa2VzdC9pY29uc1wiOiBcIl4wLjAuMTNcIixcbiAgICBcIkB0YWlsd2luZGNzcy92aXRlXCI6IFwiXjQuMC4wXCIsXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIjIwLjE0LjExXCIsXG4gICAgXCJlc2xpbnRcIjogXCI5LjI1LjFcIixcbiAgICBcImVzbGludC1wbHVnaW4tcXdpa1wiOiBcIl4xLjE1LjBcIixcbiAgICBcImdsb2JhbHNcIjogXCIxNi4wLjBcIixcbiAgICBcInByZXR0aWVyXCI6IFwiMy4zLjNcIixcbiAgICBcInByZXR0aWVyLXBsdWdpbi10YWlsd2luZGNzc1wiOiBcIl4wLjYuMTFcIixcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjQuMC4wXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiNS40LjVcIixcbiAgICBcInR5cGVzY3JpcHQtZXNsaW50XCI6IFwiOC4yNi4xXCIsXG4gICAgXCJ0eXBlc2NyaXB0LXBsdWdpbi1jc3MtbW9kdWxlc1wiOiBcImxhdGVzdFwiLFxuICAgIFwidW5kaWNpXCI6IFwiKlwiLFxuICAgIFwidmVyY2VsXCI6IFwiXjQ0LjYuNlwiLFxuICAgIFwidml0ZVwiOiBcIjUuMy41XCIsXG4gICAgXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI6IFwiXjQuMi4xXCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGF1dGgvdXBzdGFzaC1yZWRpcy1hZGFwdGVyXCI6IFwiXjIuMTAuMFwiLFxuICAgIFwiQGNhcGFjaXRvci9jb3JlXCI6IFwiXjcuNC4yXCIsXG4gICAgXCJAY2FwYWNpdG9yL25ldHdvcmtcIjogXCJeNy4wLjFcIixcbiAgICBcIkBjYXBhY2l0b3Ivc2NyZWVuLW9yaWVudGF0aW9uXCI6IFwiXjcuMC4xXCIsXG4gICAgXCJAY2FwYWNpdG9yL3RvYXN0XCI6IFwiXjcuMC4xXCIsXG4gICAgXCJAZW1haWxqcy9icm93c2VyXCI6IFwiXjQuNC4xXCIsXG4gICAgXCJAbGlic3FsL2NsaWVudFwiOiBcIl4wLjE1LjEwXCIsXG4gICAgXCJAdHlwZXMvbWluaW1hdGNoXCI6IFwiXjYuMC4wXCIsXG4gICAgXCJAdXBzdGFzaC9yZWRpc1wiOiBcIl4xLjM1LjNcIixcbiAgICBcIkB1cHN0YXNoL3NlYXJjaFwiOiBcIl4wLjEuNVwiLFxuICAgIFwiQHZlcmNlbC9hbmFseXRpY3NcIjogXCJeMS41LjBcIixcbiAgICBcIkB2ZXJjZWwvYmxvYlwiOiBcIl4xLjEuMVwiLFxuICAgIFwiQHZlcmNlbC9zcGVlZC1pbnNpZ2h0c1wiOiBcIl4xLjIuMFwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tYmFzaWMtc3NsXCI6IFwiXjIuMS4wXCIsXG4gICAgXCJlbWFpbGpzXCI6IFwiXjQuMC4zXCIsXG4gICAgXCJlbWFpbGpzLWNvbVwiOiBcIl4zLjIuMFwiLFxuICAgIFwiZXhwcmVzc1wiOiBcIl41LjEuMFwiLFxuICAgIFwiZnVzZS5qc1wiOiBcIl43LjEuMFwiLFxuICAgIFwiaW9yZWRpc1wiOiBcIl41LjcuMFwiLFxuICAgIFwicmVzZW5kXCI6IFwiXjQuNy4wXCIsXG4gICAgXCJzd2VldGFsZXJ0MlwiOiBcIl4xMS4yMi4yXCJcbiAgfSxcbiAgXCJ0cnVzdGVkRGVwZW5kZW5jaWVzXCI6IFtcbiAgICBcIkBwYXJjZWwvd2F0Y2hlclwiLFxuICAgIFwiQHRhaWx3aW5kY3NzL294aWRlXCIsXG4gICAgXCJAdmVyY2VsL3NwZWVkLWluc2lnaHRzXCIsXG4gICAgXCJ2ZXJjZWxcIlxuICBdXG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBSUEsU0FBUyxvQkFBcUM7QUFDOUMsU0FBUyxnQkFBZ0I7QUFDekIsU0FBUyxnQkFBZ0I7QUFDekIsT0FBTyxtQkFBbUI7OztBQ1AxQjtBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsYUFBZTtBQUFBLEVBQ2YsU0FBVztBQUFBLElBQ1QsTUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLHNCQUFzQjtBQUFBLEVBQ3RCLFNBQVc7QUFBQSxFQUNYLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxJQUNULE9BQVM7QUFBQSxJQUNULGdCQUFnQjtBQUFBLElBQ2hCLGlCQUFpQjtBQUFBLElBQ2pCLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLFFBQVU7QUFBQSxJQUNWLEtBQU87QUFBQSxJQUNQLGFBQWE7QUFBQSxJQUNiLEtBQU87QUFBQSxJQUNQLGFBQWE7QUFBQSxJQUNiLE1BQVE7QUFBQSxJQUNSLFNBQVc7QUFBQSxJQUNYLE9BQVM7QUFBQSxJQUNULE1BQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxpQkFBbUI7QUFBQSxJQUNqQixjQUFjO0FBQUEsSUFDZCxvQkFBb0I7QUFBQSxJQUNwQix5QkFBeUI7QUFBQSxJQUN6QixjQUFj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
