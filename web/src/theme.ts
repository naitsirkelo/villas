import { Modal, Paper, Select, Switch, createTheme } from "@mantine/core";

export const theme = createTheme({
  colors: {
    blue: [
      "#e5e9f3",
      "#cbd3e6",
      "#b1beda",
      "#99a9cd",
      "#8094c0",
      "#697fb3",
      "#526ba6",
      "#3d5698",
      "#28428b",
      "#152c7d",
    ],
    green: [
      "#e6fefc",
      "#d6f9f6",
      "#adf1ec",
      "#81eae1",
      "#5fe3d9",
      "#4ae0d3",
      "#3dded1",
      "#2dc4b9",
      "#1bafa4",
      "#00988e",
    ],
    teal: [
      "#ecf9f8",
      "#c5edea",
      "#9ee1dc",
      "#77d5ce",
      "#84d9d3",
      "#36afa7",
      "#2a8882",
      "#1e615d",
      "#123a38",
      "#061313",
    ],
  },
  primaryColor: "blue",
  primaryShade: 9,
  fontFamily: "Plus Jakarta Sans Variable",
  headings: {
    sizes: {
      h1: {
        fontWeight: "500",
      },
      h2: {
        fontWeight: "500",
      },
    },
  },
  components: {
    Select: Select.extend({
      defaultProps: {
        size: "xs",
      },
      styles: {
        input: {
          borderRadius: "var(--mantine-radius-lg)",
          boxShadow: "var(--mantine-shadow-xs)",
          color: "var(--mantine-color-blue-9)",
          border: "none",
        },
        option: {
          color: "var(--mantine-color-blue-9)",
        },
        dropdown: {
          borderRadius: "var(--mantine-radius-lg)",
          boxShadow: "var(--mantine-shadow-xs)",
          border: "none",
        },
      },
    }),
    Paper: Paper.extend({
      defaultProps: {
        radius: "lg",
        shadow: "md",
        withBorder: true,
      },
    }),
    Switch: Switch.extend({
      styles: {
        labelWrapper: {
          flexGrow: 1,
        },
      },
    }),
    Modal: Modal.extend({
      defaultProps: {
        size: "xl",
        centered: true,
      },
      styles: {
        title: {
          fontSize: "var(--mantine-font-size-xl)",
          fontWeight: "bold",
        },
      },
    }),
  },
});
