export class AppController {
  constructor(selector, pubSub) {
    this.element = document.querySelector(selector);
    this.pubSub = pubSub;
    this.mql = window.matchMedia("screen and (max-width: 750px)");
    this.addEventListeners();
  }

  addEventListeners() {
    this.addToggleMenuListener();
    this.addWindowResizedListener();
  }

  addToggleMenuListener() {
    this.pubSub.subscribe("openclose", event => {
      if (this.mql.matches == true) {
        this.toggleMenu();
      }
    });
  }

  toggleMenu() {
    const value = this.element.classList.toggle("show-menu");
  }

  addWindowResizedListener() {
    //Evento para controlar el cambio de menú de pantalla completa a menú desplegable
    this.changeMediaQuery(this.mql);
    this.mql.addListener(this.changeMediaQuery);
  }

  changeMediaQuery(mql) {
    //Se obtiene el body en local porque hay veces que this.element está undefined
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
  }
}
