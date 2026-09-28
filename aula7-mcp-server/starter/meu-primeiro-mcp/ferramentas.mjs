// A lógica de cada tool mora aqui, separada do server.
// Motivo: função pura dá pra testar com `npm test` sem abrir o Claude Code.

import { randomInt } from "node:crypto";

// Tool 1 (pronta): rola um dado de verdade.
// Um modelo de linguagem não sorteia: ele prevê o próximo token. Se você pedir
// "rola um d20" sem tool, ele escreve um número que parece sorteado.
// Com a tool, quem sorteia é o Node.
export function rolarDado(lados) {
  if (!Number.isInteger(lados) || lados < 2 || lados > 1000) {
    throw new Error("lados precisa ser um inteiro entre 2 e 1000");
  }
  return randomInt(1, lados + 1);
}

// TODO (LAB 2, passo 4): escreva aqui a lógica da SUA segunda tool.
// Regra: função pura, recebe dados, devolve dados. Nada de console.log.
//
// export function minhaFuncao(entrada) {
//   ...
//   return resultado;
// }
