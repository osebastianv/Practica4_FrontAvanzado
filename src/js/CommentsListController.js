import { GeneralFunctions } from "./GeneralFunctions.js";

export class CommentsListController {
  constructor(selector, appService, pubSub) {
    this.element = document.querySelector(selector);
    this.appService = appService;
    this.pubSub = pubSub;
    this.Scrollpoints = require("scrollpoints");
    this.generalFunctions = new GeneralFunctions();
    this.addEventListeners();
  }

  addEventListeners() {
    this.addSubscribeCommentCreate();
    this.addScrollPointListener();
  }

  addSubscribeCommentCreate() {
    this.pubSub.subscribe("comment:created", (event, createdComment) => {
      this.loadComments("");
    });
  }

  //Carga la lista de comentarios solo cuando es visible en pantalla, no antes (solo la primera vez)
  addScrollPointListener() {
    var config = {
      when: "entering",
      reversed: false,
      once: true
    };

    var elem = document.querySelector(".comments-list");

    var self = this;
    this.Scrollpoints.add(
      elem,
      function(domElement) {
        console.log("Salta");
        self.loadComments("");
      },
      config
    );
  }

  showLoadingMessage() {
    this.element.innerHTML =
      '<div class="loading">Cargando comentarios...</div>';
  }

  showErrorMessage() {
    this.element.innerHTML =
      '<div class="error">Se ha producido un error</div>';
  }

  showNoDataMessage() {
    this.element.innerHTML =
      '<div class="empty">No hay ningún comentario</div>';
  }

  renderComments(comments) {
    let html = "";

    for (let comment of comments) {
      const date = this.generalFunctions.dateFormat(comment.date);
      console.log("C", comment.date, date);

      html += `<article class="comment">
                <div class="comment-name">#${comment.id}  ${
        comment.name
      }, ${date}</div>
                <div class="comment-text">${comment.text}</div>
              </article>`;
    }

    this.element.innerHTML = html;
  }

  loadComments(filter) {
    this.showLoadingMessage();

    if (filter == "") {
      filter += "?";
    } else {
      filter += "&";
    }

    //Orden descendente
    filter += "_sort=id&_order=desc";

    this.appService
      .list(filter)
      .then(comments => {
        if (comments.length == 0) {
          this.showNoDataMessage();
        } else {
          this.renderComments(comments);
        }
      })
      .catch(error => {
        console.error("ERROR RETRIEVING COMMENTS", error);
        this.showErrorMessage();
      });
  }
}
