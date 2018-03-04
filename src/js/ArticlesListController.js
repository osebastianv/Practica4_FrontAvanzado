import { ArticlesService } from "./ArticlesService";
const path = require("path");
const fs = require("fs");

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

  fileExists(path) {
    try {
      return fs.statSync(path).isFile();
    } catch (e) {
      return false;
    }
  }

  renderArticles(articles) {
    let html = "";

    for (let article of articles) {
      const image = path.join(
        __dirname,
        "src/assets/img/houses",
        article.image
      );

      console.log(image);
      console.log(fileExists(image));

      /*if (fs.fstatSync(image)) {
        // Do something
        console.log("SI", image);
      }*/

      const photo = path.join(
        __dirname,
        "src/assets/img/photos",
        article.photo
      );
      //console.log(photo);

      html += `<article class="article">
                <div class="image">
                    <img src="${image}" alt="${article.title}">
                </div>
                <div class="info">
                    <div class="title">${article.title}</div>
                    <div class="intro">${article.intro}</div>

                    <div class="author">
                        <img src="${photo}" alt="${article.author}">
                        <div class="name">${article.author}</div>
                    </div>

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
