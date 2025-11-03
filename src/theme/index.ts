import { createSystem, defaultConfig } from "@chakra-ui/react"
import { buttonRecipe } from "./button.recipe"

// Custom theme configuration
const customConfig = {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#e0e1dd" },
          100: { value: "#778da9" },
          200: { value: "#415a77" },
          300: { value: "#1b263b" },
          400: { value: "#0d1b2a" },
        },
      },
      fonts: {
        heading: { value: "Inter, system-ui, sans-serif" },
        body: { value: "Inter, system-ui, sans-serif" },
        mono: { value: "JetBrains Mono, monospace" },
      },
      spacing: {
        xs: { value: "0.5rem" },
        sm: { value: "1rem" },
        md: { value: "1.5rem" },
        lg: { value: "2rem" },
        xl: { value: "3rem" },
      },
      radii: {
        sm: { value: "0.25rem" },
        md: { value: "0.5rem" },
        lg: { value: "1rem" },
        full: { value: "9999px" },
      },
      shadows: {
        sm: { value: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" },
        md: { value: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
        lg: { value: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" },
        xl: { value: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" },
      },
    },

    recipes: {
      button: buttonRecipe,
    },
  },
}

// Create the custom system by merging with default config
export const system = createSystem(defaultConfig, customConfig)

