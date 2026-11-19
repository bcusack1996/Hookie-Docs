import React from "react";
import { createRoot } from "react-dom/client";
import Form from "../shared/ReactForm.jsx";
import "../shared/style.css";
createRoot(document.getElementById("app")).render(<Form framework="react" />);
