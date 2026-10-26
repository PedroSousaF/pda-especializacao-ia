// A lógica de cada tool mora aqui, separada do server.
// Motivo: função pura dá pra testar com `npm test` sem abrir o Claude Code.

import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

export const PASTA_DADOS = path.join(path.dirname(fileURLToPath(import.meta.url)), "dados");

// Agrupa respostas por tópico e ordena do maior para o menor percentual de erro.
// shortcut: mesma regra de mapa-de-erros/src/analisaErros.js copiada aqui; extrair um pacote se as duas divergirem.
export function resumirErros(respostas) {
  const porTopico = new Map();
  for (const r of respostas) {
    const t = porTopico.get(r.topico) ?? { topico: r.topico, erros: 0, total: 0 };
    t.total += 1;
    if (!r.correta) t.erros += 1;
    porTopico.set(r.topico, t);
  }
  return [...porTopico.values()]
    .map((t) => ({ ...t, taxaErro: Math.round((t.erros / t.total) * 100) }))
    .sort((a, b) => b.taxaErro - a.taxaErro || b.erros - a.erros);
}

const NOME_ARQUIVO = /^[a-z0-9-]{1,40}\.json$/;
const NOME_TOPICO = /^[a-z0-9-]{1,40}$/;
const TAMANHO_MAXIMO = 100 * 1024;

// Mensagens fixas: nunca repetem a entrada nem trechos do arquivo (era assim que o canário vazava).
export async function diagnosticarTurma(arquivo) {
  if (typeof arquivo !== "string" || !NOME_ARQUIVO.test(arquivo)) {
    throw new Error("arquivo inválido: use só o nome de um .json de dados/, ex.: turma-a.json");
  }
  const caminho = path.resolve(PASTA_DADOS, arquivo);
  if (path.dirname(caminho) !== PASTA_DADOS) throw new Error("arquivo inválido: fora de dados/");

  let info;
  try {
    info = await stat(caminho);
  } catch {
    throw new Error("arquivo não encontrado em dados/");
  }
  if (!info.isFile() || info.size > TAMANHO_MAXIMO) throw new Error("arquivo inválido: maior que 100 KB ou não é arquivo");

  let respostas;
  try {
    respostas = JSON.parse(await readFile(caminho, "utf8"));
  } catch {
    throw new Error("arquivo não é um JSON válido");
  }
  if (!Array.isArray(respostas)) throw new Error("arquivo deve conter uma lista de respostas");
  for (const r of respostas) {
    if (!r || typeof r.topico !== "string" || !NOME_TOPICO.test(r.topico) || typeof r.correta !== "boolean") {
      throw new Error("arquivo com resposta fora do formato { topico: a-z0-9-, correta: boolean }");
    }
  }
  return resumirErros(respostas);
}
