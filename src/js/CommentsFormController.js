import { CommentsFormValidations } from "./CommentsFormValidations.js";
import { GeneralFunctions } from "./GeneralFunctions.js";

export class CommentsFormController {
  constructor(selector, appService, pubSub) {
    this.element = document.querySelector(selector);
    this.appService = appService;
    this.pubSub = pubSub;
    this.loading = false;
    this.commentsFormValidations = new CommentsFormValidations();
    this.generalFunctions = new GeneralFunctions();
    this.addEventListeners();
  }

  setLoading(loading) {
    this.loading = loading;
    this.element.querySelectorAll("input, button").forEach(item => {
      item.disabled = loading;
    });
  }

  addEventListeners() {
    this.addFormSubmitListener();
  }

  addFormSubmitListener() {
    document.addEventListener("submit", event => {
      event.preventDefault();

      const contactOK = this.commentsFormValidations.checkContact(event);
      if (contactOK == false) {
        return;
      }

      if (this.loading) {
        return; // si se está cargando, no hacemos nada más
      }
      this.setLoading(true);
      let comment = this.buildData();

      this.appService
        .save(comment)
        .then(createdComment => {
          console.log("COMENTARIO CREADO", createdComment);
          this.element.reset();
          this.commentsFormValidations.refreshWordsCounter(0);
          this.pubSub.publish("comment:created", createdComment);
        })
        .catch(error => {
          console.error("SE HA PRODUCIDO UN ERROR");
          alert(`Se ha producido un error ${error}`);
        })
        .finally(() => {
          this.setLoading(false);
        });
    });
  }

  buildData() {
    return {
      name: this.element.querySelector("#contact-name").value,
      email: this.element.querySelector("#contact-email").value,
      text: this.element.querySelector("#comments-text").value,
      date: this.generalFunctions.currentDateFormat()
    };
  }
}
