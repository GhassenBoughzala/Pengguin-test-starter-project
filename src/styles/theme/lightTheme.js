import { createTheme, responsiveFontSizes } from "@mui/material";
import globalTheme from "./globalTheme";

let lightTheme = createTheme({
  ...globalTheme("light"),
  palette: {
    mode: "light",
    ...globalTheme("light").palette,
    background: {
      default: "#FFFFFF",
    },
  },
});

lightTheme = responsiveFontSizes(lightTheme);

export default lightTheme;
