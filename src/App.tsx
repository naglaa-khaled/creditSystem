import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { routes } from "./Routes";
import { getDesignTokens } from "./Theme";
import { useMemo, useState } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext } from "./ColorModeContext";

function App() {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("themeMode") as "light" | "dark") || "light";
  });
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => {
          const newMode = prev === "light" ? "dark" : "light";
          localStorage.setItem("themeMode", newMode);
          return newMode;
        });
      },
    }),
    [],
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={mode}
        />
        <RouterProvider router={routes} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
