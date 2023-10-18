import { createTheme } from "@material-ui/core/styles";
import preval from "babel-plugin-preval/macro";

const fullConfig = preval`
  const resolveConfig = require('tailwindcss/resolveConfig');
  const tailwindConfig = require('../tailwind.config');
  module.exports = resolveConfig(tailwindConfig);
`;

export default () =>
  createTheme({
    typography: {
      fontFamily: "Nunito",
    },
    palette: {
      common: {
        black: "#23232D",
        ...fullConfig.theme.colors.po,
      },
      primary: {
        main: "#23232D",
        dark: "#23232D",
        light: "#E5E5E5",
      },
      secondary: {
        main: "#FFBB66",
        dark: "#F5A94A",
        light: "#FFE6BA",
      },
      text: {
        primary: "#23232D",
        secondary: "#F5A94A",
        hint: "#1214274B",
        disabled: "#71727D",
      },
      action: {
        disabledBackground: "rgba(255, 230, 186, 0.5)",
        disabled: "#71727D",
      },
      background: {
        default: "#FFFFFF",
      },
    },
    overrides: {
      MuiButton: {
        root: {
          textTransform: "none",
          fontSize: "1rem",
          lineHeight: 1.5,
          fontWeight: 700,
          padding: "0px",
          borderRadius: 10,
          minWidth: 40,
          "&$disabled": {
            background: "none",
            fontWeight: 200,
          },
        },
        sizeSmall: {
          minWidth: 80,
          height: 36,
        },
        sizeLarge: {
          height: 40,
          fontSize: 18,
          fontWeight: 400,
          maxWidth: 280,
        },
        containedSizeLarge: {
          padding: "0px",
        },
        contained: {
          boxShadow: "0px 20px 40px rgba(7, 41, 72, 0.06)",
        },
        outlinedSecondary: {
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          "&:hover": {
            border: "1px solid rgba(255, 255, 255, 1)",
          },
        },
        containedSecondary: {
          color: "#23232D",
          backgroundColor: "#FFE6BA",
          boxShadow: "0px 20px 40px rgba(7, 41, 72, 0.06)",
          "&:hover": {
            backgroundColor: "rgba(245,169,74,0.82)",
          },
        },
        containedPrimary: {
          color: "#F5A94A",
          fontWeight: "700",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 20px 40px rgba(7, 41, 72, 0.06)",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.81)",
          },
        },
        colorInherit: {
          backgroundColor: "white",
        },
        outlined: {
          padding: "4px 16px",
          borderRadius: 10,
        },
      },
      MuiTooltip: {
        tooltip: {
          fontSize: "0.9rem",
        },
      },
      MuiFormControlLabel: {
        label: {
          width: "calc(90%)",
          display: "block",
          fontSize: "0.95rem",
          textOverflow: "ellipsis",
          overflowX: "hidden",
          whiteSpace: "nowrap",
        },
      },
      MuiOutlinedInput: {
        root: {
          borderRadius: 10,
        },
        input: {
          padding: "1rem 1.1875rem",
          outline: "none !important",
          boxShadow: "none !important",
          "&::placeholder": {
            color: fullConfig.theme.colors.po.graydark,
          },
        },
      },
      MuiInputLabel: {
        root: {
          color: fullConfig.theme.colors.po.graymedium,
        },
      },
      MuiCheckbox: {
        colorSecondary: {
          color: "#4F4F4F",
          "&$checked": {
            color: "#4F4F4F",
          },
        },
      },
      MuiChip: {
        root: {
          borderRadius: 4,
        },
        colorSecondary: {
          backgroundColor: "#FFE6BA",
        },
      },
      MuiRating: {
        root: {
          color: "#FFBB66",
        },
        iconEmpty: {
          color: "#FFBB66",
        },
        sizeSmall: {
          fontSize: "1.25rem",
        },
        sizeLarge: {
          fontSize: "2.2rem",
        },
      },
      MuiMobileStepper: {
        dot: {
          backgroundColor: "#FFE6BA",
        },
        dotActive: {
          backgroundColor: "#E27F03",
        },
      },
      MuiListItem: {
        gutters: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
      MuiRadio: {
        root: {
          padding: 0,
        },
        colorPrimary: {
          color: "#4F4F4F",
          "&$checked": {
            color: "#200E32",
          },
        },
      },
      MuiDropzonePreviewList: {
        image: {
          height: "100% !important",
          width: "100% !important",
          objectFit: "cover",
        },
        removeButton: {
          top: "0.25rem",
          right: "0.25rem",
          width: "36px",
          height: "36px",
          minHeight: 0,
        },
      },
      MuiSelect: {
        select: {
          "&:focus": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  });
