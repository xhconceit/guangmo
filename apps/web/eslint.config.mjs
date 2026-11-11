import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/components/ui/Icon.tsx"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [{
          group: ["@phosphor-icons/react", "@phosphor-icons/react/*", "lucide-react", "lucide-react/*"],
          message: "请从 @/components/ui/Icon 导入图标，统一图标来源与视觉校准。",
        }],
      }],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
