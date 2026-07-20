import { defineConfig, globalIgnores } from "eslint/config";
// nextVitals: enforces Next.js Core Web Vitals rules (performance-focused linting)
import nextVitals from "eslint-config-next/core-web-vitals";
// nextTs: adds TypeScript-aware rules on top of the base Next.js config
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  // Spread both rule sets in — order matters; later rules can override earlier ones
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  // eslint-config-next normally also ignores node_modules, .cache, etc.
  // Here we only ignore the build output folders relevant to this project.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",      // Next.js build cache & output
    "out/**",        // Static export output
    "build/**",      // Vite / vinext build output
    "next-env.d.ts", // Auto-generated Next.js type declaration file
  ]),
]);

export default eslintConfig