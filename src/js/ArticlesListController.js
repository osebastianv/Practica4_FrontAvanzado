export class ArticlesListController {
  constructor(selector, appService, pubSub) {
    this.element = document.querySelector(selector);
    console.log("J: ", this.element);
    this.appService = appService;
    this.pubSub = pubSub;
    this.addEventListeners();
  }

  addEventListeners() {
    this.addSelectedItemMenuListener();
    //this.addSelectedTitleListener();
  }

  addSelectedItemMenuListener() {
    this.pubSub.subscribe("menu:selected", (event, filter) => {
      this.loadArticles(filter);
      console.log(filter);
      //if (filter !== undefined) {
      if (typeof filter !== "undefined" && filter !== "") {
        //console.log("SI");
        this.pubSub.publish("openclose");
      }
    });
  }

  /*addSelectedTitleListener() {
    document.getElementsByClassName("title").forEach(li => {
      li.addEventListener("click", event => {
        alert("ok");
      });
    });
  }*/

  addSelectedTitleListener() {
    //document.addEventListener("DOMContentLoaded", () => {
    //try {
    console.log("Titles1");
    const items = document.getElementsByClassName("title");

    console.log("Titles:", items);
    console.log("vale", items.length);

    for (let i = 0; i < items.length; i++) {
      //console.log("algo:", items[i]);
      items[i].addEventListener("click", event => {
        //alert("ok", event);
        //console.log("ok", event.target.innerText);
        window.open("detail.html", "_self");
        //console.log(window.name);
      });
    }
    //} catch (err) {
    //  console.log("Error", err);
    //}
    //});
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

      //console.log(article.urlType);

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
                        <div class="name">${article.author}</div>
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
    //console.log("algo1", filter);
    this.showLoadingMessage();

    if (typeof filter !== "undefined") {
      if (filter !== "Inicio" && filter !== "") {
        filter = "?tag=" + filter;
      }
    }

    this.appService
      .list(filter)
      .then(articles => {
        //console.log(articles);
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
