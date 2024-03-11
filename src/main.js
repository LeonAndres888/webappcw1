import { createApp } from "vue";
import App from "./App.vue";
import "../registerServiceWorker";

const app = createApp(App);
app.mount("#app");

// Check that service workers are supported
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
