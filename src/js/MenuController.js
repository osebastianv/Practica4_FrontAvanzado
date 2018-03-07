//import { AppService } from "./appService";

export class MenuController {
  constructor(selector, appService, pubSub, type) {
    this.element = document.querySelector(selector);
    this.appService = appService;
    this.pubSub = pubSub;
    this.type = type; //1. index; 2. detail
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
        if (this.type == 1) {
          this.pubSub.publish("menu:selected", event.srcElement.innerText);
        } else {
          //alert(event.srcElement.innerText);
          window.open("index.html", "_self");
        }
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

    html += `<form novalidate class="search">
    <div>
        <input type="text" class="input-search" name="search" placeholder="Buscar...">
    </div>
    </form>`;

    //<i class="fa fa-search"></i>

    html += `</ul>`;

    this.element.innerHTML = html;

    console.log("A", this.type);
    if (this.type == 1) {
      this.pubSub.publish("menu:selected", "");
    }

    //Necesario aquí para esperar a que se genere la lista
    this.loadEvents();
  }

  filterTags(articles) {
    let filterArticles = [];
    for (let element of articles) {
      if (
        filterArticles
          .map(el => {
            return el.tag;
          })
          .indexOf(element.tag) === -1
      ) {
        filterArticles.push(element);
      }
    }

    return filterArticles;
  }

  loadMenu() {
    this.appService
      .list("")
      .then(articles => {
        //console.log("H: ", articles);
        articles = this.filterTags(articles);
        //console.log("I: ", articles);

        if (articles.length != 0) {
          this.renderMenu(articles);
        }
      })
      .catch(error => {
        console.error("ERROR RETRIEVING MENU", error);
      });
  }
}
