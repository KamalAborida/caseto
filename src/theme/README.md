# Custom Theme Guide

## Overview

Your custom theme is defined in `src/theme/index.ts` and extends Chakra UI's default configuration.

## Theme Structure

### Colors

#### Brand Colors (Blue palette)
- `brand.50` through `brand.900` - Full spectrum from lightest to darkest

#### Primary Colors
- `primary.light` - `#3b82f6`
- `primary.main` - `#2563eb`
- `primary.dark` - `#1e40af`

#### Secondary Colors
- `secondary.light` - `#a78bfa`
- `secondary.main` - `#8b5cf6`
- `secondary.dark` - `#7c3aed`

### Fonts
- `heading` - Inter, system-ui, sans-serif
- `body` - Inter, system-ui, sans-serif
- `mono` - JetBrains Mono, monospace

### Spacing
- `xs` - 0.5rem
- `sm` - 1rem
- `md` - 1.5rem
- `lg` - 2rem
- `xl` - 3rem

### Border Radius
- `sm` - 0.25rem
- `md` - 0.5rem
- `lg` - 1rem
- `full` - 9999px (fully rounded)

### Shadows
- `sm` - Small subtle shadow
- `md` - Medium shadow
- `lg` - Large shadow
- `xl` - Extra large shadow

## Custom Button Variants

Your theme includes three custom button variants:

- **primary** - Background: `brand.200`, Text: `brand.50`
- **outline** - Border & Text: `brand.200`, transparent background
- **ghost** - Text: `brand.200`, transparent background

### Using Custom Buttons

```tsx
import { Button } from "@/components/ui/button"

<Button variant="primary">Primary Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
```

## Usage Examples

### Using Theme Colors

```tsx
import { Box } from "@chakra-ui/react"

<Box bg="brand.200" color="brand.50">
  Brand colored box
</Box>

<Box bg="brand.300" p="md">
  Dark brand with medium padding
</Box>
```

### Using Custom Spacing

```tsx
<Box p="xs">Extra small padding</Box>
<Box m="lg">Large margin</Box>
<Stack gap="md">Medium gap between items</Stack>
```

### Using Border Radius

```tsx
<Box borderRadius="sm">Small rounded corners</Box>
<Box borderRadius="lg">Large rounded corners</Box>
<Box borderRadius="full">Fully rounded (pill shape)</Box>
```

### Using Shadows

```tsx
<Box shadow="sm">Small shadow</Box>
<Box shadow="lg">Large shadow</Box>
```

### Using Custom Fonts

```tsx
<Heading fontFamily="heading">Heading font</Heading>
<Text fontFamily="body">Body text font</Text>
<Code fontFamily="mono">Monospace code font</Code>
```

## Extending the Theme

To add more theme tokens, edit `src/theme/index.ts`:

```ts
const customConfig = {
  theme: {
    tokens: {
      colors: {
        // Add your custom colors
        success: {
          light: { value: "#10b981" },
          main: { value: "#059669" },
          dark: { value: "#047857" },
        },
      },
      // Add more token categories
      fontSizes: {
        tiny: { value: "0.75rem" },
        huge: { value: "4rem" },
      },
    },
  },
}
```

## Tips

1. Always use theme tokens instead of hardcoded values for consistency
2. The theme is fully typed - TypeScript will autocomplete your token names
3. You can override any Chakra UI default by adding it to your custom config
4. Use semantic naming (e.g., `primary`, `success`) rather than color names

