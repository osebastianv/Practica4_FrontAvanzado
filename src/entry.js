import css from "./scss/style.scss";
import { AppController } from "./js/AppController";
import { AppService } from "./js/AppService";
import { HeaderController } from "./js/HeaderController";
import { MenuController } from "./js/MenuController";
import { ArticlesListController } from "./js/ArticlesListController";
import { PubSub } from "pubsub-js";

document.addEventListener("DOMContentLoaded", () => {
  let appController = new AppController("body", PubSub);
  let headerController = new HeaderController(".web-header", PubSub);

  let appService = new AppService("http://localhost:3001/articles");
  //console.log(appService.url);

  let articlesListController = new ArticlesListController(
    ".articles-list",
    appService,
    PubSub
  );

  let menuController = new MenuController(".articles-menu", appService, PubSub);
  menuController.loadMenu();
});
