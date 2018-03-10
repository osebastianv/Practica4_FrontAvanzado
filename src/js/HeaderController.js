export class HeaderController {
  constructor(selector, pubSub) {
    this.element = document.querySelector(selector);
    this.pubSub = pubSub;
    this.addEventListeners();
  }

  addEventListeners() {
    this.addOpenCloseMenuButtonListener();
  }

  addOpenCloseMenuButtonListener() {
    this.element.querySelector(".fa").addEventListener("click", event => {
      this.pubSub.publish("openclose");
    });
  }
}
