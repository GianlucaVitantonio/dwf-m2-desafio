import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  
  pelis: Peli[] = [];
  async getAll(): Promise<Peli[]> {
   const pelis = await jsonfile.readFile(__dirname + "/pelis.json")
   return pelis;
  };
     
  async getById (id:number) {
    const todasLasPelis = await this.getAll()
    return todasLasPelis.find((item) => {
      return item.id == id; 
    }) 
   };  
  

  async search (options:any) {
    const todasLasPelis = await this.getAll();
    return todasLasPelis.filter(peli => {
      if (options.title && options.tag) {
        return peli.title.includes(options.title) && peli.tags.includes(options.tag)
      }
        else if (options.title) {
        return peli.title.includes(options.title) 
      } else if (options.tag) {
        return peli.tags.includes(options.tag)
      }
    });
  };

  async add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        const data = jsonfile.readFileSync("./pelis.json");
        data.push(peli);
        const promesaDos = jsonfile.writeFile("./pelis.json", data);

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }


  }

  
  
export { PelisCollection, Peli };
