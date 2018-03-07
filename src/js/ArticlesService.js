export class ArticlesService {
  constructor(url) {
    this.url = url;
    //console.log("1-", this.url);
  }

  async list(filter) {
    let url = this.url;
    if (typeof filter !== "undefined") {
      if (filter !== "Inicio" && filter !== "") {
        url += "?tag=" + filter;
      }
    }

    const response = await fetch(url);
    return response.json();
  }
}
