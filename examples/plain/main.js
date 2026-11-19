import { enhanceForm } from "@hookieai/forms";
import { message } from "../shared/demo.mjs";
import "../shared/style.css";
const show = (result) => {
  document.querySelector("output").textContent = message(result);
};
enhanceForm(document.querySelector("form"), { onSuccess: show, onError: show });
