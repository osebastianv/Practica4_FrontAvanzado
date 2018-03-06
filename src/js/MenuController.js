import { ArticlesService } from "./ArticlesService";

export class MenuController {
  constructor(selector, pubSub) {
    this.element = document.querySelector(selector);
    this.pubSub = pubSub;
    //this.addEventListeners();
  }

  /*addEventListeners() {
    this.addMenuSelectedListener();
  }

  changeMediaQuery(mql) {
    //alert(mql.matches);
    console.log(mql.matches);

    const body = document.querySelector("body");
    if (mql.matches == true) {
      if (body.classList.contains("show-menu") == true) {
        body.classList.toggle("show-menu");
      }
    } else {
      if (body.classList.contains("show-menu") == false) {
        body.classList.toggle("show-menu");
      }
    }
    console.log("Contiene: ", body.classList.contains("show-menu"));
  }

  addMenuSelectedListener() {
    var mql = window.matchMedia("screen and (max-width: 750px)");
    this.changeMediaQuery(mql);
    mql.addListener(this.changeMediaQuery);
  }*/

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
        /*this.articlesListController.loadArticles(event.srcElement.innerText);
        //appController.toggleForm();
        this.pubSub.publish("menu:closed");*/
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

    //this.articlesListController.loadArticles("Inicio");
    this.pubSub.publish("menu:selected", "");

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
