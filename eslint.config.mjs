// ESLint 9 flat config, using the configs that ship with eslint-config-next.
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  { ignores: ['.next/**', 'node_modules/**', 'public/**', 'next-env.d.ts'] },
];

export default eslintConfig;
