import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  envPrefix: "WEB",
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["test/**/*.test.{ts,tsx}"],
    setupFiles: ["test/testSetup.ts"],
    coverage: {
      provider: "istanbul",
      include: ["src/**/*"],
      all: true,
    },
  },
});
