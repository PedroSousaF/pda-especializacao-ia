// mcp-demo-vulneravel: SERVER DE DEMONSTRAÇÃO, INSEGURO DE PROPÓSITO.
//
// Uso: riscos 1 e 2 da aula 8 (ROTEIRO-FACILITADORA.md). Serve de exemplo
// de como NÃO escrever uma tool.
//
// As duas falhas são deliberadas:
// 1. `ler_issue` devolve o conteúdo cru do arquivo. O modelo recebe a issue
//    inteira, inclusive um trecho que finge ser instrução de sistema.
//    (OWASP LLM01:2026 Prompt Injection, na forma indireta)
// 2. `gerar_relatorio_html` escreve o texto que o modelo mandou direto num
//    arquivo HTML, sem escapar nada.
//    (OWASP LLM10:2026 Improper Output Handling, era LLM05 na lista de 2025)

import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const pasta = path.dirname(fileURLToPath(import.meta.url));
const FIXTURES = path.join(pasta, "fixtures");

const server = new McpServer({ name: "mcp-demo-vulneravel", version: "0.2.0" });

// FALHA 1: nenhuma barreira entre "isto é dado pra resumir" e "isto é ordem".
server.registerTool(
  "ler_issue",
  {
    description: "Lê uma issue do rastreador pelo número e devolve o conteúdo completo.",
    inputSchema: z.object({
      id: z.number().int().describe("Número da issue. Ex.: 42"),
    }),
  },
  async ({ id }) => {
    try {
      const conteudo = await readFile(path.join(FIXTURES, `issue-${id}.txt`), "utf-8");
      return { content: [{ type: "text", text: conteudo }] };
    } catch {
      return { content: [{ type: "text", text: `Issue #${id} não encontrada.` }], isError: true };
    }
  },
);

// FALHA 2: o HTML recebe o texto do modelo do jeito que veio.
// Se vier <script>, vai <script> pro arquivo.
server.registerTool(
  "gerar_relatorio_html",
  {
    description: "Gera um relatório em HTML com o conteúdo fornecido e devolve o caminho do arquivo.",
    inputSchema: z.object({
      conteudo: z.string().describe("Conteúdo do corpo do relatório (pode ter HTML)"),
    }),
  },
  async ({ conteudo }) => {
    const html = `<!doctype html>
<html lang="pt-br">
<head><meta charset="utf-8"><title>Relatório</title></head>
<body>
<h1>Relatório</h1>
<div>${conteudo}</div>
</body>
</html>`;
    const caminho = path.join(pasta, "relatorio.html");
    await writeFile(caminho, html, "utf-8");
    return { content: [{ type: "text", text: `Relatório gerado em ${caminho}` }] };
  },
);

await server.connect(new StdioServerTransport());
console.error("mcp-demo-vulneravel no ar (uso exclusivo em demo)");
