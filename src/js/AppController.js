export class AppController {
  constructor(selector, pubSub) {
    this.element = document.querySelector(selector);
    /*pubSub.subscribe("article:created", (event, article) => {
      console.log("AppController", article);
      this.toggleForm();
    });*/
    pubSub.subscribe("article:selected", event => {
      console.log("AppController", "ok");
      this.toggleForm();
    });
  }

  toggleForm() {
    this.element.classList.toggle("show-menu");
  }
}
