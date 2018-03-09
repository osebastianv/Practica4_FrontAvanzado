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
var Scrollpoints = require("scrollpoints");

document.addEventListener("DOMContentLoaded", () => {
  let appController = new AppController("body", PubSub);
  let headerController = new HeaderController(".web-header", PubSub);
  let footerController = new FooterController(".web-footer", PubSub);

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

  var config = {
    when: "entering",
    reversed: true,
    once: false
  };

  var elem = document.querySelector(".comments-list");

  /*Scrollpoints.add(
    elem,
    function(domElement) {
      alert("ok");
    },
    config
  );*/
  // Scroll to specific values
  // scrollTo is the same
  /*window.scroll({
    top: 2500,
    left: 0,
    behavior: "smooth"
  });

  // Scroll certain amounts from current position
  window.scrollBy({
    top: 0, // could be negative value
    left: 0,
    behavior: "smooth"
  });

  // Scroll to a certain element
  document.querySelector(".comments-list").scrollIntoView({
    behavior: "smooth"
  });*/
});
