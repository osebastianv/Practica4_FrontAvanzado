import { ArticlesService } from "./ArticlesService";

export class MenuController {
  constructor(selector, articlesListController, pubSub) {
    this.element = document.querySelector(selector);
    this.articlesListController = articlesListController;
    this.pubSub = pubSub;
    /*this.element
      .querySelector(".menu_item")
      .addEventListener("click", event => {
        //var origEl = event.target || event.srcElement;
        //console.log(origEl.href);
        //console.log(event);
        //alert("algo");
        //appController.toggleForm();
      });*/
  }

  deleteActiveClass() {
    var menuItems = document.getElementsByClassName("menu_item");
    for (var i = 0; i < menuItems.length; i++) {
      menuItems[i].classList.remove("menu_item--active");
      console.log(menuItems[i]);
      //menuItems[i].classList.add("menu_item");
    }
  }

  loadEvents() {
    var menuItems = document.getElementsByClassName("menu_item");
    //console.log(menuItems);

    for (var i = 0; i < menuItems.length; i++) {
      menuItems[i].addEventListener("click", event => {
        event.preventDefault();
        this.deleteActiveClass();
        //console.log(event.srcElement.innerText);
        event.srcElement.classList.add("menu_item--active");
        this.articlesListController.loadArticles(event.srcElement.innerText);
        //appController.toggleForm();
        this.pubSub.publish("article:selected");
      });
    }
  }

  renderMenu(articles) {
    let html = "";

    html += `<ul class="menu_list">`;
    html += `<li class="menu_item menu_item--active">
                Inicio
            </li>`;

    //<a href="">Inicio</a>

    for (let article of articles) {
      if (article.tag != "") {
        html += `<li class="menu_item">
              ${article.tag}
              </li>`;
      }
    }

    //<a href="">${article.tag}</a>

    html += `</ul>`;

    this.element.innerHTML = html;

    this.articlesListController.loadArticles("Inicio");

    this.loadEvents();
  }

  loadMenu() {
    let articlesService = new ArticlesService();
    articlesService
      .list()
      .then(articles => {
        //console.log(articles);
        if (articles.length != 0) {
          this.renderMenu(articles);
        }
      })
      .catch(error => {
        console.error("ERROR RETRIEVING MENU", error);
      });
  }
}
