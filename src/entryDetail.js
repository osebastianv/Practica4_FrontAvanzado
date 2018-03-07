import cssDetail from "./scss/styleDetail.scss";
import { AppController } from "./js/AppController";
import { AppService } from "./js/AppService";
import { HeaderController } from "./js/HeaderController";
import { CommentsListController } from "./js/CommentsListController";
import { PubSub } from "pubsub-js";

document.addEventListener("DOMContentLoaded", () => {
  let appController = new AppController("body", PubSub);
  let headerController = new HeaderController(".web-header", PubSub);

  let appService = new AppService("http://localhost:3001/comments");

  let commentsListController = new CommentsListController(
    ".comments-list",
    appService,
    PubSub
  );
  commentsListController.loadComments();
});
