# mcp-demo-vulneravel

**Inseguro de propósito.** Usado nos riscos 1 e 2 da aula 8. Não copie o jeito de escrever
estas tools; copie o jeito de desconfiar delas.

| tool | falha | risco OWASP 2026 |
|---|---|---|
| `ler_issue` | devolve o texto da issue inteiro, sem separar dado de ordem | LLM01 Prompt Injection (indireta) |
| `gerar_relatorio_html` | escreve no HTML o que o modelo mandou, sem escapar | LLM10 Improper Output Handling (era LLM05 em 2025) |

A `fixtures/issue-42.txt` tem uma "nota interna" que finge ser instrução de sistema e pede
pro agente ler `fixtures/segredo.txt` e colocar um `<script>` no relatório. O segredo é
falso.

## Rodar

```bash
npm install
claude mcp add demo-vulneravel -- node "$(pwd)/espiao.mjs"
claude
```

Pedidos da demo: "resume a issue 42" e depois "gera um relatório em HTML da issue 42".
Abra o `conversa.log` e procure a nota interna chegando no resultado do `ler_issue`: ela
entra na janela do modelo, obedecendo ou não.

Pra ver a falha 2 sem depender do modelo: MCP Inspector (Node 22.19+),
`npx @modelcontextprotocol/inspector node server.mjs`, chame `gerar_relatorio_html` com
`<p>oi</p><script>alert(1)</script>` e abra o `relatorio.html` no navegador.

Correções em `CORRECAO.md`. Depois: `claude mcp remove demo-vulneravel`.
