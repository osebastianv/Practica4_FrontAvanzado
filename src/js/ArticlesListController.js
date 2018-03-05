import { ArticlesService } from "./ArticlesService";
//const path = require("path");
//const fs = require("fs");

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

  showNoArticlesMessage() {
    this.element.innerHTML = '<div class="info">No hay ningún artículo</div>';
  }

  /*fileExists(path) {
    try {
      return fs.statSync(path).isFile();
    } catch (e) {
      return false;
    }
  }*/

  renderArticles(articles) {
    let html = "";

    for (let article of articles) {
      /*const image = path.join(
        __dirname,
        "src/assets/img/houses",
        article.url
      );

      let isVideo = false;
      const regex = /\.(mov|mpeg4|mp4|avi|wmv|mpegps|flv|3gpp|webm|dnxhr|prores|cineform|hevc)$/; //Extensiones youtube
      if (regex.test(image)) {
        isVideo = true;
        console.log("VIDEO: " + image);
      } else {
        console.log("IMG: " + image);
      }*/

      //console.log(fileExists(image));

      /*if (fs.fstatSync(image)) {
        // Do something
        console.log("SI", image);
      }*/

      /*const photo = path.join(
        __dirname,
        "src/assets/img/photos",
        article.photo
      );*/
      //console.log(photo);

      html += `<article class="article">
                <div class="url">`;

      console.log(article.urlType);

      if (article.urlType == 1) {
        //1. Imagen
        html += `<img src="${article.url}" alt="${article.title}">`;
      } else {
        //2. Video
        /*html += `<video controls>
                    <source src="${article.url}" type="video/mp4">
                  </video>`;*/

        //html += ` <iframe src="https://www.youtube.com/embed/g1IICkElV0M" allow="autoplay; encrypted-media"></iframe>`;
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
                        <div class="comments">
                          <i class="fa fa-comments"></i>
                        </div>
                        <p class="commentsNumber">100</p>
                    </div>

                </div>
            </article>`;
    }
    this.element.innerHTML = html;
  }

  loadArticles(filter) {
    //console.log("algo1", filter);
    this.showLoadingMessage();
    let articlesService = new ArticlesService();
    articlesService
      .list(filter)
      .then(articles => {
        //console.log(articles);
        if (articles.length == 0) {
          this.showNoArticlesMessage();
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
