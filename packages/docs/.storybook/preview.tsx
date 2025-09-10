import type { Preview } from "@storybook/react-vite";
import { lightTheme, darkTheme } from "./theme";

// Import design tokens CSS
import "@ras-ui/tokens";

// Import global styles
import "../../react/src/styles/global.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: lightTheme,
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#111827",
        },
        {
          name: "surface",
          value: "#f9fafb",
        },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: {
            width: "375px",
            height: "667px",
          },
        },
        tablet: {
          name: "Tablet",
          styles: {
            width: "768px",
            height: "1024px",
          },
        },
        desktop: {
          name: "Desktop",
          styles: {
            width: "1024px",
            height: "768px",
          },
        },
        wide: {
          name: "Wide",
          styles: {
            width: "1440px",
            height: "900px",
          },
        },
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
          { value: "hc-light", title: "HC Light", icon: "contrast" },
          { value: "hc-dark", title: "HC Dark", icon: "contrast" },
        ],
        dynamicTitle: true,
      },
    },
    brand: {
      description: "Global brand for components",
      defaultValue: "default",
      toolbar: {
        title: "Brand",
        icon: "component",
        items: [
          { value: "default", title: "Default", icon: "circle" },
          { value: "vibrant", title: "Vibrant", icon: "star" },
          { value: "corporate", title: "Corporate", icon: "shield" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "light";
      const brand = context.globals.brand || "default";

      // Update docs theme based on selection
      if (context.viewMode === "docs") {
        context.parameters.docs = {
          ...context.parameters.docs,
          theme:
            theme === "dark" || theme === "hc-dark" ? darkTheme : lightTheme,
        };
      }

      return (
        <div data-theme={theme} data-brand={brand} style={{ padding: "1rem" }}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
