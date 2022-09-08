import { CssBaseline, ThemeProvider } from "@mui/material";
import RouterConfig from "./routing/RouterConfig";
import { darkTheme, lightTheme } from "styles/theme";
import { useSelector } from "react-redux";
import "styles/globalStyles.css";

function App() {
  const mode  = useSelector((state) => state.theme);
  return (
    <ThemeProvider theme={mode.dark ? darkTheme : lightTheme}>
      <CssBaseline />
      <RouterConfig />
    </ThemeProvider>
  );
}



export default App;
