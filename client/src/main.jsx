import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./router";

createRoot(document.getElementById("root")).render(
  <>
    <h1 className="text-3xl underli">hello</h1>
    <RouterProvider router={router} />
  </>
);
