import * as minimist from "minimist";
import {PelisController} from './controllers'

function parseaParams(argv) {
  const resultado = minimist(argv);
  if (resultado.search) {
    return {search: resultado.search};
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));

  console.log(params);
}

main();
