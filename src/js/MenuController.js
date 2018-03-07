//import { AppService } from "./appService";

export class MenuController {
  constructor(selector, appService, pubSub) {
    this.element = document.querySelector(selector);
    this.appService = appService;
    this.pubSub = pubSub;
  }

  deleteActiveClass() {
    var menuItems = document.getElementsByClassName("menu_item");
    for (var i = 0; i < menuItems.length; i++) {
      menuItems[i].classList.remove("menu_item--active");
      //console.log(menuItems[i]);
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
        this.pubSub.publish("menu:selected", event.srcElement.innerText);
      });
    }
  }

  renderMenu(articles) {
    let html = "";

    html += `<ul class="menu_list">`;
    html += `<li class="menu_item menu_item--active">
                Inicio
            </li>`;

    for (let article of articles) {
      if (article.tag != "") {
        html += `<li class="menu_item">
              ${article.tag}
              </li>`;
      }
    }

    html += `</ul>`;

    this.element.innerHTML = html;

    //this.articlesListController.loadArticles("Inicio");
    this.pubSub.publish("menu:selected", "");

    //Necesario paquí para esperar a que se genere la lista
    this.loadEvents();
  }

  loadMenu() {
    this.appService
      .list("")
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
