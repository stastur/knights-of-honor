import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	server: { port: 3000 },
	plugins: [tsconfigPaths()],
	css: {
		postcss: {
			plugins: [autoprefixer, tailwindcss],
		},
	},
});
