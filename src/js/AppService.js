export class AppService {
  constructor(url) {
    this.url = url;
  }

  async list(filter) {
    let url = this.url;

    if (typeof filter !== "undefined") {
      if (filter !== "") {
        url += filter;
      }
    }

    const response = await fetch(url);
    return response.json();
  }

  async save(data) {
    const response = await fetch(this.url, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.json();
  }
}
