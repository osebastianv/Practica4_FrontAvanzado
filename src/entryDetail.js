import cssDetail from "./scss/styleDetail.scss";
import { AppController } from "./js/AppController";
import { AppService } from "./js/AppService";
import { HeaderController } from "./js/HeaderController";
import { MenuController } from "./js/MenuController";
import { ArticlesListController } from "./js/ArticlesListController";
import { CommentsListController } from "./js/CommentsListController";
import { CommentsFormController } from "./js/CommentsFormController";
import { PubSub } from "pubsub-js";

document.addEventListener("DOMContentLoaded", () => {
  let appController = new AppController("body", PubSub);
  let headerController = new HeaderController(".web-header", PubSub);

  let appService1 = new AppService("http://localhost:3001/articles");
  let appService2 = new AppService("http://localhost:3001/comments");

  let articlesListController = new ArticlesListController(
    ".articles-list",
    appService1,
    PubSub
  );

  let menuController = new MenuController(
    ".articles-menu",
    appService1,
    PubSub,
    2
  );
  menuController.loadMenu();

  let commentsListController = new CommentsListController(
    ".comments-list",
    appService2,
    PubSub
  );
  commentsListController.loadComments("");

  let commentsFormController = new CommentsFormController(
    ".comments-form",
    appService2,
    PubSub
  );
});
