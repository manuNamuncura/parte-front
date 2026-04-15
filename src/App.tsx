import { RouterProvider } from "@tanstack/react-router";
import { useThemeStore } from "./store/useThemeStore";
import { useLayoutEffect } from "react";
import { router } from "./routes";

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useLayoutEffect(() => {
    const root = window.document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return <RouterProvider router={router}/>
}

export default App;
