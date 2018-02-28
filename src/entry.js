import css from "./scss/style.scss";
import { ArticlesListController } from "./js/ArticlesListController";

document.addEventListener("DOMContentLoaded", () => {
  /*let appController = new AppController("body");
  let headerController = new HeaderController(".web-header", appController);*/

  let articlesListController = new ArticlesListController(".articles-list");
  articlesListController.loadArticles();
});
