import { CommentsFormValidations } from "./CommentsFormValidations.js";
import { GeneralFunctions } from "./GeneralFunctions.js";

export class CommentsFormController {
  constructor(selector, appService, pubSub) {
    this.element = document.querySelector(selector);
    this.appService = appService;
    this.pubSub = pubSub;
    this.loading = false;

    /*this.nameInput = document.getElementById("contact-name");
    this.emailInput = document.getElementById("contact-email");
    this.commentsInput = document.getElementById("comments-text");
    this.commentsCounter = document.getElementById("comments-counter");*/

    this.commentsFormValidations = new CommentsFormValidations();
    this.generalFunctions = new GeneralFunctions();

    //this.previewContador = 0;
    //this.filtrarMensaje = false;

    this.addEventListeners();
  }

  setLoading(loading) {
    this.loading = loading;
    this.element.querySelectorAll("input, button").forEach(item => {
      item.disabled = loading;
    });
  }

  addEventListeners() {
    //this.addInputListeners();
    this.addFormSubmitListener();
    //this.addFormCommentsListener();
  }

  addFormSubmitListener() {
    document.addEventListener("submit", event => {
      event.preventDefault();

      //const contactOK = this.checkContact(event);
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

  /*checkContact(event) {
    // Validamos nombre
    if (this.nameInput.checkValidity() === false) {
      alert("Escriba su nombre, por favor");
      this.nameInput.focus();
      event.preventDefault();
      return false;
    }

    // Validamos el email
    const regex = /[A-Za-z0-9\.\+]+@[A-Za-z0-9]+\.[A-Za-z0-9\.]+/;
    const resultEmailValidation = regex.test(this.emailInput.value);

    if (resultEmailValidation === false) {
      alert("Escriba un email correcto, por favor (nombre@compañía.es)");
      this.emailInput.focus();
      event.preventDefault();
      return false;
    }

    //Validamos si el campo comentarios sobrepasa las 150 palabras
    const contador = this.countWords(this.commentsInput.value);
    if (contador == 0) {
      alert("El contenido del comentario no puede estar vacío.");
      this.commentsInput.focus();
      event.preventDefault();
      return false;
    }

    if (contador > 120) {
      alert(
        "El contenido escrito sobrepasa las 120 palabras, recorte el texto por favor."
      );

      this.commentsInput.focus();
      event.preventDefault();
      return false;
    }

    return true;
  }

  countWords(text) {
    if (typeof text === "undefined") text = "";
    let comentario = text.replace(/\r?\n/g, " ");
    //comentario = comentario.replace(/\r?\n/g, " ");

    let arrayPalabras = comentario.split(" ");
    let contador = 0;

    for (let i = 0; i < arrayPalabras.length; i++) {
      if (arrayPalabras[i].length >= 1) {
        contador += 1;
      }
    }
    return contador;
  }*/

  /*refreshWordsCounter(contador) {
    var text;
    if (contador == 1) {
      text = contador + " palabra (máx 120)";
    } else {
      text = contador + " palabras (máx 120)";
    }

    this.commentsCounter.innerText = text;
    this.previewContador = contador;
  }

  addFormCommentsListener() {
    this.commentsInput.addEventListener("keyup", event => {
      const contador = this.countWords(this.commentsInput.value);
      this.refreshWordsCounter(contador);

      if (contador > 120) {
        if (this.filtrarMensaje == false) {
          alert(
            "El contenido escrito sobrepasa las 120 palabras, recorte el texto por favor."
          );
          this.filtrarMensaje = true;

          this.commentsInput.focus();
          event.preventDefault();
          return false;
        }
      } else {
        this.filtrarMensaje = false;
      }
    });

    this.commentsInput.addEventListener("paste", event => {
      //Ponemos el setTimeout para poder obtener el valor del campo al completo, ya que en el evento paste la propiedad value no contiene el texto a pegar
      setTimeout(function() {
        let commentsInput = document.getElementById("comments-text");
        //if (typeof this.commentsInput === "undefined") return;
        const contador = this.countWords(commentsInput.value);

        if (this.previewContador == contador) {
          return false; //para que no saque el mensaje de > 150 en los 2 eventos (keyup y paste) al copiar desde teclado
        }
        this.refreshWordsCounter(contador);

        if (contador > 120) {
          if (this.filtrarMensaje == false) {
            alert(
              "El contenido escrito sobrepasa las 120 palabras, recorte el texto por favor."
            );
            this.filtrarMensaje = true;
            commentsInput.focus();
          }
        } else {
          this.filtrarMensaje = false;
        }
      }, 1000);
    });
  }*/
}

/*addInputListeners() {
    // en todos los input que hay en el formulario, los valido cuando se pierde el foco
    this.element.querySelectorAll("input").forEach(input => {
      input.addEventListener("blur", event => {
        // event.target sería lo mismo que input en este caso
        if (input.checkValidity() == false) {
          input.classList.add("error");
        } else {
          input.classList.remove("error");
        }
        this.checkFormValidity();
      });
    });
  }

  checkFormValidity() {
    let button = this.element.querySelector("button");
    if (this.element.checkValidity()) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  }*/
