import css from "./scss/style.scss";
import { AppController } from "./js/AppController";
import { AppService } from "./js/AppService";
import { HeaderController } from "./js/HeaderController";
import { FooterController } from "./js/FooterController";
import { MenuController } from "./js/MenuController";
import { ArticlesListController } from "./js/ArticlesListController";
import { PubSub } from "pubsub-js";

document.addEventListener("DOMContentLoaded", () => {
  let appController = new AppController("body", PubSub);
  let headerController = new HeaderController(".web-header", PubSub);
  let footerController = new FooterController(".web-footer", PubSub);

  let appService = new AppService("http://localhost:3001/articles");

  let articlesListController = new ArticlesListController(
    ".articles-list",
    appService,
    PubSub
  );

  let menuController = new MenuController(
    ".articles-menu",
    appService,
    PubSub,
    1
  );
  menuController.loadMenu();
});
