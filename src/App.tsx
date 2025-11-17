import { BrowserRouter } from "react-router-dom";
import AppRoutes from "@/routes";

import "@/styles/print.css";


export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

