// Tailwind v4 output uses CSS cascade layers (@layer). Browsers older than ~2022 (Safari < 15.4,
// Chrome < 99) ignore layered rules completely, which would leave the site unstyled. This plugin
// rewrites the layers into plain CSS with equivalent priority, so older phones get the full design.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "@csstools/postcss-cascade-layers": {},
  },
};

export default config;
