/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for Vercel Edge when building for production.
 *
 * Learn more about the Vercel Edge integration here:
 * - https://qwik.dev/docs/deployments/vercel-edge/
 *
 */
import {
  createQwikCity,
  type PlatformVercel,
} from "@builder.io/qwik-city/middleware/vercel-edge";
import qwikCityPlan from "@qwik-city-plan";
import render from "./entry.ssr";

declare global {
  type QwikCityPlatform = PlatformVercel;
}

export default createQwikCity({ render, qwikCityPlan });
