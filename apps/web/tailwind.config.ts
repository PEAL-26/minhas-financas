import tailwindConfig from "@repo/ui/tailwind.config";
import type { Config } from "tailwindcss";

const config = {
  presets: [tailwindConfig],
} satisfies Pick<Config, "presets">;

export default config;

