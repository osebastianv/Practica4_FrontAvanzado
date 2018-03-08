let moment = require("moment");
moment.locale("es");

export class GeneralFunctions {
  currentDateFormat() {
    return moment().format("YYYY-MM-DD HH:mm:ss");
  }

  dateFormat(date) {
    //const momentDate = moment("2018-03-01 17:05:00");
    const momentDate = moment(date);
    //const momentNow = Date.now();
    const momentNow = moment().format("YYYY-MM-DD HH:mm:ss");

    //Segundos
    let diff = momentDate.diff(momentNow, "seconds") * -1;
    if (diff < 0) {
      return "";
    }

    if (diff < 60) {
      //return momentDate.startOf("seconds").fromNow();
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

    //Horas
    diff = momentDate.diff(momentNow, "days") * -1;
    if (diff < 7) {
      return momentDate.format("dddd");
    }

    //console.log("L", momentDate.day());
    //console.log("L", momentDate.format("dddd"));
    //console.log("L", momentDate.format("LLLL"));

    //console.log("L", momentDate.diff(momentNow, "seconds") * -1);
    //console.log("L", momentDate.diff(momentNow, "minutes") * -1);
    //console.log("L", momentDate.diff(momentNow, "hours") * -1);
    //console.log("L", momentDate.diff(momentNow, "days") * -1);
    console.log(diff);
    return momentDate.format("LLLL");
  }
}
