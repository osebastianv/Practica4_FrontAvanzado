export class HeaderController {
  constructor(selector, pubSub) {
    this.element = document.querySelector(selector);
    this.pubSub = pubSub;

    this.element.querySelector(".fa").addEventListener("click", event => {
      this.pubSub.publish("menu:closed");
      //appController.toggleMenu();
    });
  }
}
