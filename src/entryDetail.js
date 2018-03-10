import cssDetail from "./scss/styleDetail.scss";
import { AppController } from "./js/AppController";
import { AppService } from "./js/AppService";
import { HeaderController } from "./js/HeaderController";
import { FooterController } from "./js/FooterController";
import { MenuController } from "./js/MenuController";
import { ArticlesListController } from "./js/ArticlesListController";
import { CommentsListController } from "./js/CommentsListController";
import { CommentsFormController } from "./js/CommentsFormController";
import { PubSub } from "pubsub-js";

document.addEventListener("DOMContentLoaded", () => {
  let appController = new AppController("body", PubSub);
  let headerController = new HeaderController(".web-header", PubSub);
  let footerController = new FooterController(".web-footer", PubSub);

  let appServiceArticles = new AppService("http://localhost:3001/articles");
  let appServiceComments = new AppService("http://localhost:3001/comments");

  let articlesListController = new ArticlesListController(
    ".articles-list",
    appServiceArticles,
    PubSub
  );

  let menuController = new MenuController(
    ".articles-menu",
    appServiceArticles,
    PubSub,
    2
  );
  menuController.loadMenu();

  let commentsListController = new CommentsListController(
    ".comments-list",
    appServiceComments,
    PubSub
  );

  let commentsFormController = new CommentsFormController(
    ".comments-form",
    appServiceComments,
    PubSub
  );
});
