import css from "./scss/style.scss";
import { AppController } from "./js/AppController";
import { HeaderController } from "./js/HeaderController";
import { MenuController } from "./js/MenuController";
import { ArticlesListController } from "./js/ArticlesListController";
import { PubSub } from "pubsub-js";

document.addEventListener("DOMContentLoaded", () => {
  let appController = new AppController("body", PubSub);
  let headerController = new HeaderController(".web-header", appController);

  let articlesListController = new ArticlesListController(".articles-list");
  //articlesListController.loadArticles();

  let menuController = new MenuController(
    ".articles-menu",
    articlesListController,
    PubSub
  );
  menuController.loadMenu();
});
