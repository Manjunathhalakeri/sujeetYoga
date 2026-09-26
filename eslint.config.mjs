import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

/**
 * eslint-config-next v16 ships native flat config, so no FlatCompat shim.
 *
 * The `next/typescript` preset is deliberately omitted: it pulls in
 * typescript-eslint, which does not yet support the TypeScript 7 line. Type
 * errors are caught by `next build` / `npm run typecheck` instead, so nothing
 * is actually lost.
 */
const config = [
  ...nextCoreWebVitals,
  { ignores: ['.next/**', 'node_modules/**', 'out/**', 'next-env.d.ts'] },
];

export default config;
