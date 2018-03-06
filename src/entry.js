import css from "./scss/style.scss";
import { AppController } from "./js/AppController";
import { HeaderController } from "./js/HeaderController";
import { MenuController } from "./js/MenuController";
import { ArticlesListController } from "./js/ArticlesListController";
import { ArticlesService } from "./js/ArticlesService";
import { PubSub } from "pubsub-js";

document.addEventListener("DOMContentLoaded", () => {
  let appController = new AppController("body", PubSub);
  let headerController = new HeaderController(".web-header", PubSub);

  let articlesService = new ArticlesService("http://localhost:3001/articles");
  console.log(articlesService.url);

  let articlesListController = new ArticlesListController(
    ".articles-list",
    articlesService,
    PubSub
  );
  //articlesListController.loadArticles();

  let menuController = new MenuController(
    ".articles-menu",
    articlesService,
    PubSub
  );
  menuController.loadMenu();
});
