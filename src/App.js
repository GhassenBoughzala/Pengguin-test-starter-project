import { CssBaseline, ThemeProvider } from "@mui/material";
import RouterConfig from "./routing/RouterConfig";
import { darkTheme, lightTheme } from "styles/theme";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "styles/globalStyles.css";
import { useState } from "react";

function App() {
  const mode  = useSelector((state) => state.theme);
  const [LocalWatch] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  !LocalWatch && localStorage.setItem("watchlist", JSON.stringify([]));
  LocalWatch.length === 0 && localStorage.setItem("watchlist", JSON.stringify([]));
  return (
    <ThemeProvider theme={mode.dark ? darkTheme : lightTheme}>
       <ToastContainer position="bottom-right" />
      <CssBaseline />
      <RouterConfig />
    </ThemeProvider>
  );
}



export default App;
