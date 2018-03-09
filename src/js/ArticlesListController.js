import { GeneralFunctions } from "./GeneralFunctions.js";
//let moment = require("moment");
//moment.locale("es");

export class ArticlesListController {
  constructor(selector, appService, pubSub) {
    this.element = document.querySelector(selector);
    this.appService = appService;
    this.pubSub = pubSub;

    this.generalFunctions = new GeneralFunctions();
    this.addEventListeners();
  }

  addEventListeners() {
    //this.addSelectedItemCommentListener();
    this.addSelectedItemMenuListener();
    //this.addSelectedTitleListener();
  }

  addSelectedItemMenuListener() {
    this.pubSub.subscribe("menu:selected", (event, filter) => {
      this.loadArticles(filter);
      //if (filter !== undefined) {
      if (typeof filter !== "undefined" && filter !== "") {
        this.pubSub.publish("openclose");
      }
    });
  }

  addSelectedTitleListener() {
    const items = document.getElementsByClassName("title");

    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener("click", event => {
        window.open("detail.html", "_self");
      });
    }
  }

  addSelectedItemCommentListener() {
    const items = document.getElementsByClassName("comments-info");

    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener("click", event => {
        window.open("/detail.html#comments2", "_self");
      });
    }
  }

  showLoadingMessage() {
    this.element.innerHTML = '<div class="loading">Cargando artículos...</div>';
  }

  showErrorMessage() {
    this.element.innerHTML =
      '<div class="error">Se ha producido un error</div>';
  }

  showNoDataMessage() {
    this.element.innerHTML = '<div class="info">No hay ningún artículo</div>';
  }

  renderArticles(articles) {
    let html = "";

    for (let article of articles) {
      html += `<article class="article">
                <div class="url">`;

      const date = this.generalFunctions.dateFormat(article.date);

      if (article.urlType == 1) {
        //1. Imagen
        html += `<img src="${article.url}" alt="${article.title}">`;
      } else {
        //2. Video
        html += ` <iframe src="${
          article.url
        }" allow="autoplay; encrypted-media"></iframe>`;
      }

      html += `</div>
                <div class="info">
                    <div class="title">${article.title}</div>
                    <div class="intro">${article.intro}</div>

                    <div class="author">
                        <img src="${article.photo}" alt="${article.author}">
                        <div class="name">${article.author}, ${date}</div>
                        <div class="comments-info">
                          <i class="fa fa-comments"></i>
                          <p class="commentsNumber">0</p>
                        </div>
                    </div>
                </div>
            </article>`;

      //<a href="detail.html#comments">ir</a>
    }
    this.element.innerHTML = html;

    this.addSelectedTitleListener();
    this.addSelectedItemCommentListener();
  }

  loadArticles(filter) {
    this.showLoadingMessage();

    if (typeof filter !== "undefined") {
      if (filter !== "Inicio" && filter !== "") {
        filter = "?tag=" + filter;
      } else {
        filter = "";
      }
    }

    this.appService
      .list(filter)
      .then(articles => {
        if (articles.length == 0) {
          this.showNoDataMessage();
        } else {
          this.renderArticles(articles);
        }
      })
      .catch(error => {
        console.error("ERROR RETRIEVING ARTICLES", error);
        this.showErrorMessage();
      });
  }
}
