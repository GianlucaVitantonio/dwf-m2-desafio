import * as minimist from "minimist";
import {PelisController} from './controllers'

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function processOptions(params) {
  const controller = new PelisController();
  // parsear get
  if (params._[0] == "get") {
    return controller.get({ id: params._[1] }).then((res) => res)
  }
}

function main() {
  
  const params = parseaParams(process.argv.slice(2));
  return processOptions(params).then(res => console.log(res))
  
}

main();
