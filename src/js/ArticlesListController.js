import { ArticlesService } from "./ArticlesService";
const path = require("path");

export class ArticlesListController {
  constructor(selector) {
    this.element = document.querySelector(selector);
  }

  showLoadingMessage() {
    this.element.innerHTML = '<div class="loading">Cargando artículos...</div>';
  }

  showErrorMessage() {
    this.element.innerHTML =
      '<div class="error">Se ha producido un error</div>';
  }

  showNoSongsMessage() {
    this.element.innerHTML = '<div class="info">No hay ningún artículo</div>';
  }

  renderArticles(articles) {
    let html = "";

    for (let article of articles) {
      const imgPath = path.join(__dirname, "src/assets/img", article.image);
      //console.log(imgPath);

      html += `<article class="article">
                <div class="image">
                    <img src="${imgPath}" alt="${article.author} - ${
        article.title
      }">
                </div>
                <div class="info">
                    <div class="title">${article.title}</div>
                    <div class="artist">${article.author}</div>
                </div>
            </article>`;
    }
    this.element.innerHTML = html;
  }

  loadArticles() {
    this.showLoadingMessage();
    let articlesService = new ArticlesService();
    articlesService
      .list()
      .then(articles => {
        //console.log(articles);
        if (articles.length == 0) {
          this.showNoSongsMessage();
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
