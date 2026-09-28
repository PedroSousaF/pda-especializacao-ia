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
import { rolarDado } from "./ferramentas.mjs";

const server = new McpServer({
  name: "meu-primeiro-mcp",
  version: "0.1.0",
});

// ---------------------------------------------------------------------------
// Tool 1 (pronta). Repare nas três partes que o MODELO lê:
//   1. o nome            -> "rolar_dado"
//   2. a descrição       -> quando usar e o que volta
//   3. o schema          -> quais parâmetros, com .describe() em cada um
// A função async no fim é a única parte que o modelo NÃO lê. Ela só roda.
// ---------------------------------------------------------------------------
server.registerTool(
  "rolar_dado",
  {
    description:
      "Rola um dado com a quantidade de lados pedida e devolve o número sorteado. " +
      "Use sempre que a pessoa pedir um sorteio, um dado (d6, d20...) ou um número aleatório.",
    inputSchema: z.object({
      lados: z
        .number()
        .int()
        .min(2)
        .max(1000)
        .describe("Quantidade de lados do dado. Ex.: 6 para um d6, 20 para um d20."),
    }),
  },
  async ({ lados }) => {
    const resultado = rolarDado(lados);
    return {
      content: [{ type: "text", text: `d${lados} -> ${resultado}` }],
    };
  },
);

// ---------------------------------------------------------------------------
// TODO (LAB 2, passo 4): registre aqui a SUA segunda tool.
// Copie o bloco acima e troque as três partes que o modelo lê.
// Teste de fogo: o Claude precisa escolher a sua tool a partir de um pedido
// que NÃO fala o nome dela.
//
// server.registerTool(
//   "nome_da_sua_tool",
//   {
//     description: "O que ela faz. Use quando ...",
//     inputSchema: z.object({
//       campo: z.string().describe("o que é esse campo, com exemplo"),
//     }),
//   },
//   async ({ campo }) => {
//     return { content: [{ type: "text", text: "resultado" }] };
//   },
// );
// ---------------------------------------------------------------------------

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("meu-primeiro-mcp no ar (stdio). Isso aqui vai pro stderr, não pro cano.");
