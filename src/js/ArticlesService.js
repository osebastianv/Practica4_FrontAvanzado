export class ArticlesService {
  async list(filter) {
    let url = "http://localhost:3001/articles";
    if (filter !== undefined) {
      if (filter !== "Inicio") {
        url += "?tag=" + filter;
      }
    }

    console.log("algo", filter, url);
    const response = await fetch(url);
    return response.json();
  }
}
