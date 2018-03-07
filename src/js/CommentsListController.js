export class CommentsListController {
  constructor(selector, appService, pubSub) {
    this.element = document.querySelector(selector);
    console.log("J: ", this.element);
    this.appService = appService;
    this.pubSub = pubSub;
    this.addEventListeners();
  }

  addEventListeners() {}

  showLoadingMessage() {
    this.element.innerHTML =
      '<div class="loading">Cargando comentarios...</div>';
  }

  showErrorMessage() {
    this.element.innerHTML =
      '<div class="error">Se ha producido un error</div>';
  }

  showNoDataMessage() {
    this.element.innerHTML = '<div class="info">No hay ningún comentario</div>';
  }

  renderComments(comments) {
    let html = "";

    for (let comment of comments) {
      html += `<article class="comment">
                <div class="comment-name">${comment.name}</div>
                <div class="comment-email">${comment.email}</div>
                <div class="comment-text">${comment.text}</div>
              </article>`;
    }
    this.element.innerHTML = html;
  }

  loadComments(filter) {
    //console.log("algo1", filter);
    this.showLoadingMessage();

    this.appService
      .list(filter)
      .then(comments => {
        //console.log(articles);
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
