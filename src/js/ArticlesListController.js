import { GeneralFunctions } from "./GeneralFunctions.js";
//let moment = require("moment");
//moment.locale("es");

export class ArticlesListController {
  constructor(selector, appService, pubSub) {
    this.element = document.querySelector(selector);
    //console.log("J: ", this.element);
    this.appService = appService;
    this.pubSub = pubSub;

    this.generalFunctions = new GeneralFunctions();
    this.addEventListeners();
  }

  addEventListeners() {
    this.addSelectedItemMenuListener();
    //this.addSelectedTitleListener();
  }

  addSelectedItemMenuListener() {
    this.pubSub.subscribe("menu:selected", (event, filter) => {
      this.loadArticles(filter);
      //console.log(filter);
      //if (filter !== undefined) {
      if (typeof filter !== "undefined" && filter !== "") {
        //console.log("SI");
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

  /*dateFormat(date) {
    //const momentDate = moment("2018-03-01 17:05:00");
    const momentDate = moment(date);
    const momentNow = Date.now();

    //Segundos
    let diff = momentDate.diff(momentNow, "seconds") * -1;
    if (diff < 0) {
      return "";
    }

    if (diff < 60) {
      //return momentDate.startOf("seconds").fromNow();
      console.log(diff);
      if (diff == "1") {
        return `hace ${diff} segundo`;
      } else {
        return `hace ${diff} segundos`;
      }
    }

    //Minutos
    diff = momentDate.diff(momentNow, "minutes") * -1;
    if (diff < 60) {
      console.log(diff);
      if (diff == "1") {
        return `hace ${diff} minuto`;
      } else {
        return `hace ${diff} minutos`;
      }
    }

    //Horas
    diff = momentDate.diff(momentNow, "hours") * -1;
    if (diff < 24) {
      console.log(diff);
      if (diff == "1") {
        return `hace ${diff} hora`;
      } else {
        return `hace ${diff} horas`;
      }
    }

    //Horas
    diff = momentDate.diff(momentNow, "days") * -1;
    if (diff < 7) {
      console.log(diff);
      return momentDate.format("dddd");
    }

    //console.log("L", momentDate.day());
    //console.log("L", momentDate.format("dddd"));
    //console.log("L", momentDate.format("LLLL"));

    //console.log("L", momentDate.diff(momentNow, "seconds") * -1);
    //console.log("L", momentDate.diff(momentNow, "minutes") * -1);
    //console.log("L", momentDate.diff(momentNow, "hours") * -1);
    //console.log("L", momentDate.diff(momentNow, "days") * -1);
    console.log(diff);
    return momentDate.format("LLLL");
  }*/

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
                        </div>
                        <p class="commentsNumber">100</p>
                    </div>
                </div>
            </article>`;
    }
    this.element.innerHTML = html;

    this.addSelectedTitleListener();
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
