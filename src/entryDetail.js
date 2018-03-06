import cssDetail from "./scss/styleDetail.scss";
import { AppController } from "./js/AppController";
import { HeaderController } from "./js/HeaderController";
import { PubSub } from "pubsub-js";

document.addEventListener("DOMContentLoaded", () => {
  let appController = new AppController("body", PubSub);
  let headerController = new HeaderController(".web-header", PubSub);
});
