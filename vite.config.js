import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@assets": path.resolve(__dirname, "src/assets"),
			"@css": path.resolve(__dirname, "src/css"),
			"@components": path.resolve(__dirname, "src/components"),
			"@context": path.resolve(__dirname, "src/context"),
			"@pages": path.resolve(__dirname, "src/pages"),
			"@utils": path.resolve(__dirname, "src/utils"),
		},
	},
});
