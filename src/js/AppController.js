export class AppController {
  constructor(selector, pubSub) {
    this.element = document.querySelector(selector);
    this.pubSub = pubSub;
    //this.mql2 = window.matchMedia("screen and (max-width: 750px)");
    this.addEventListeners();
  }

  addEventListeners() {
    this.addToggleMenuListener();
    this.addMenuSelectedListener();
  }

  addToggleMenuListener() {
    this.pubSub.subscribe("menu:closed", event => {
      //console.log("AppController2", "ok");
      if (this.mql.matches == true) {
        this.toggleMenu();
      }
    });
  }

  toggleMenu() {
    const value = this.element.classList.toggle("show-menu");
    console.log(this.element.classList.contains("show-menu"), value);
  }

  changeMediaQuery() {
    //alert(mql.matches);
    if (typeof this.element === "undefined") {
      return;
    }
    if (typeof this.element.classList === "undefined") {
      return;
    }
    console.log(this.mql.matches);

    if (this.mql.matches == true) {
      if (this.element.classList.contains("show-menu") == true) {
        this.element.classList.toggle("show-menu");
      }
    } else {
      if (this.element.classList.contains("show-menu") == false) {
        this.element.classList.toggle("show-menu");
      }
    }
    console.log("Contiene: ", this.element.classList.contains("show-menu"));
    //console.log("Contiene2: ", this.mql2);
  }

  addMenuSelectedListener() {
    this.mql = window.matchMedia("screen and (max-width: 750px)");
    this.changeMediaQuery();
    this.mql.addListener(this.changeMediaQuery);
  }
}
