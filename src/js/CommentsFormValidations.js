export class CommentsFormValidations {
  constructor() {
    this.nameInput = document.getElementById("contact-name");
    this.emailInput = document.getElementById("contact-email");
    this.commentsInput = document.getElementById("comments-text");
    this.commentsCounter = document.getElementById("comments-counter");

    this.previewContador = 0;
    this.filtrarMensaje = false;

    this.addEventListeners();
  }

  addEventListeners() {
    this.addFormCommentsListener();
  }

  checkContact(event) {
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
  }

  refreshWordsCounter(contador) {
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
      var self = this;
      setTimeout(function() {
        let commentsInput = document.getElementById("comments-text");
        //if (typeof this.commentsInput === "undefined") return;
        const contador = self.countWords(commentsInput.value);

        if (self.previewContador == contador) {
          return false; //para que no saque el mensaje de > 150 en los 2 eventos (keyup y paste) al copiar desde teclado
        }
        self.refreshWordsCounter(contador);

        if (contador > 120) {
          if (self.filtrarMensaje == false) {
            alert(
              "El contenido escrito sobrepasa las 120 palabras, recorte el texto por favor."
            );
            self.filtrarMensaje = true;
            commentsInput.focus();
          }
        } else {
          self.filtrarMensaje = false;
        }
      }, 1000);
    });
  }
}
