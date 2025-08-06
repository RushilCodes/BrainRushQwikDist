// // src/routes/dynamic-sitemap.xml/index.tsx

// import type { RequestHandler } from "@builder.io/qwik-city";
// import { routes } from "@qwik-city-plan";
// import { createSitemap } from "./sitemap.xml";

// export const onGet: RequestHandler = (ev) => {
//   const siteRoutes = routes
//     .map(([route]) => route as string)
//     .filter(route => route !== "/");  // Exclude the '/' route

//   const sitemap = createSitemap([
//     { loc: "/", priority: 1 },  // Manually include the root route
//     ...siteRoutes.map((route) => ({
//       loc: route,
//       priority: 0.9,  // Default priority, adjust as needed
//     })),
//   ]);

//   const response = new Response(sitemap, {
//     status: 200,
//     headers: { "Content-Type": "text/xml" },
//   });

//   ev.send(response);
// };
