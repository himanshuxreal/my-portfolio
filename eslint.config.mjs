import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

// Flat config for ESLint 9 + Next.js 16 (the `next lint` command was removed in 16).
const eslintConfig = [
  {
    ignores: [".next/**", "out/**", "build/**", "node_modules/**", "next-env.d.ts"],
  },
  ...nextCoreWebVitals,
  {
    // eslint-config-next 16 enables the React Compiler (react-hooks v6) rules,
    // which this codebase predates. The flagged patterns are intentional:
    // procedural Math.random() art (purity), the useMounted hydration guard and
    // reduced-motion counter (set-state-in-effect). Surface them as warnings —
    // visible tech-debt — without failing the build.
    rules: {
      "react-hooks/purity": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",
    },
  },
];

export default eslintConfig;
