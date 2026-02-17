import { RouterProvider } from "@tanstack/react-router"
import { router } from "./router"

import { useThemeListener } from "./hooks/use-theme-listener";

function App() {
  useThemeListener();
  return (
    <RouterProvider router={router} />
  )
}

export default App
