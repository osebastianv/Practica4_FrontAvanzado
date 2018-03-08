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
    }
  }

  loadEvents() {
    var menuItems = document.getElementsByClassName("menu_item");

    for (var i = 0; i < menuItems.length; i++) {
      menuItems[i].addEventListener("click", event => {
        event.preventDefault();
        this.deleteActiveClass();
        event.srcElement.classList.add("menu_item--active");
        if (this.type == 1) {
          this.pubSub.publish("menu:selected", event.srcElement.innerText);
        } else {
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

    html += `</ul>`;

    this.element.innerHTML = html;

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
        articles = this.filterTags(articles);

        if (articles.length != 0) {
          this.renderMenu(articles);
        }
      })
      .catch(error => {
        console.error("ERROR RETRIEVING MENU", error);
      });
  }
}
