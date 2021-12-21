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
    return await jsonfile.readFile(__dirname + "/pelis.json")
  };
     
  async getById (id:number) {
    const todasLasPelis = await this.getAll();
    return todasLasPelis.find ((item) => {
      return item.id == id; 
    })  
  };

  async search (options:any) {
    const todasLasPelis = await this.getAll();
    return todasLasPelis.forEach(peli => {
      if (options.title) {
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
        // magia que agrega la pelicula a un objeto data
        const data = peli
        const promesaDos = jsonfile.writeFile("./pelis.json", data);

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }


  }

  
  

const pelis = new PelisCollection()
const pelisNuevo = pelis.add({id: 80,
  title: "TEST_TITLE",
  tags: ["tt", "rr"]})
pelisNuevo.then((res) => {console.log(res)})
export { PelisCollection, Peli };
