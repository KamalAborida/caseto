import { defineRecipe } from "@chakra-ui/react"

export const buttonRecipe = defineRecipe({
  base: {
    fontWeight: "500",
    borderRadius: "md",
    padding: "10px 16px",
    cursor: "pointer",
    transition: "all 0.2s",
    outline: "none",
    _hover: {
      opacity: "0.9",
      outline: "none",
    },
  },
  variants: {
    variant: {
      solid: {
        bg: "brand.200",
        color: "brand.50",
        border: "none",
        _hover: {
          bg: "brand.300",
          border: "none",
        },
      },
      outline: {
        border: "2px solid",
        borderColor: "brand.200",
        color: "brand.200",
        bg: "transparent",
        _hover: {
          bg: "brand.50",
        },
      },
      ghost: {
        color: "brand.200",
        bg: "transparent",
        border: "none",
        _hover: {
          bg: "brand.50",
          border: "none",
        },
      },
    },
  },
  defaultVariants: {
    variant: "solid",
  },
})