export class ArticlesService {
  async list() {
    const response = await fetch("http://localhost:3001/articles/");
    return response.json();
  }
}
