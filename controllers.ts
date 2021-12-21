import { PelisCollection, Peli } from "./models";

class PelisController {
  data: PelisCollection;
  constructor() {
    this.data = new PelisCollection();
  }
  async get(options) {
    const todasLasPelis = await this.data.getAll();
      if (options.id) {
        return this.data.getById(options.id);
      } else if (options.search.title && options.search.tag) {
        return this.data.search({
          title: options.search.title,
          tags: options.search.tags,})
      } else if (options.search.tags){
        return this.data.search({
          tags: options.search.tags})
      } else {
        return todasLasPelis;
      }; 
    }
  
  async add(peli:Peli) {
    this.data.add(peli)
  };
  
};

export { PelisController };
