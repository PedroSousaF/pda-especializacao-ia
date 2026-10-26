// meu-primeiro-mcp: o esqueleto do LAB 2 (aula 7).
//
// O que este arquivo faz: abre um MCP server que conversa por stdio
// (entrada e saída padrão do processo) e oferece tools pro Claude Code.
//
// REGRA DE OURO DE SERVER STDIO: nunca use console.log aqui.
// A saída padrão (stdout) é o cano por onde o JSON do protocolo passa.
// Qualquer texto solto ali quebra a conversa. Pra depurar, use console.error.

import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";
import { diagnosticarTurma } from "./ferramentas.mjs";

const server = new McpServer({
  name: "mapa-de-erros-mcp",
  version: "0.1.0",
});

server.registerTool(
  "diagnosticar_turma",
  {
    description:
      "Mostra em quais tópicos uma turma mais erra, a partir de um arquivo de respostas da pasta dados/. " +
      "Use quando pedirem para analisar respostas, provas ou listas de uma turma, ou saber o que revisar primeiro.",
    inputSchema: z.object({
      arquivo: z.string().describe("Nome do arquivo de respostas dentro de dados/. Ex.: turma-a.json"),
    }),
  },
  async ({ arquivo }) => {
    const topicos = await diagnosticarTurma(arquivo);
    const linhas = topicos.map((t) => `${t.topico}: ${t.erros}/${t.total} erros (${t.taxaErro}%)`);
    return { content: [{ type: "text", text: linhas.join("\n") }] };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("mapa-de-erros-mcp no ar (stdio). Isso aqui vai pro stderr, não pro cano.");
