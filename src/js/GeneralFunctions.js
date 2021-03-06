let moment = require("moment");
moment.locale("es");

export class GeneralFunctions {
  currentDateFormat() {
    return moment().format("YYYY-MM-DD HH:mm:ss");
  }

  dateFormat(date) {
    const momentDate = moment(date);
    const momentNow = moment().format("YYYY-MM-DD HH:mm:ss");

    //Segundos
    let diff = momentDate.diff(momentNow, "seconds") * -1;
    if (diff < 0) {
      return "";
    }

    if (diff < 60) {
      if (diff == "1") {
        return `hace ${diff} segundo`;
      } else {
        return `hace ${diff} segundos`;
      }
    }

    //Minutos
    diff = momentDate.diff(momentNow, "minutes") * -1;
    if (diff < 60) {
      if (diff == "1") {
        return `hace ${diff} minuto`;
      } else {
        return `hace ${diff} minutos`;
      }
    }

    //Horas
    diff = momentDate.diff(momentNow, "hours") * -1;
    if (diff < 24) {
      if (diff == "1") {
        return `hace ${diff} hora`;
      } else {
        return `hace ${diff} horas`;
      }
    }

    //Días
    diff = momentDate.diff(momentNow, "days") * -1;
    if (diff < 7) {
      return momentDate.format("dddd");
    }

    //Meses
    diff = momentDate.diff(momentNow, "months") * -1;
    if (diff < 12) {
      return momentDate.format("D [de] MMMM[, a las] H [horas]");
    }

    //Resto
    return momentDate.format("D [de] MMMM [de] YYYY[, a las] H [horas]");
  }
}
