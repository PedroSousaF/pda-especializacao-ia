# aula7-mcp-server

Semana 4: **Skills, tools e MCP**
Especialização em Desenvolvimento com IA · Programadores do Amanhã · Turma 2

> Aula 7 (conceito + demo) e aula 8 (**lab guiado paralelo**). A numeração é por aula,
> não por semana: semana 4 = aulas 7 e 8.

Na semana 3 você ensinou o agente com uma skill. Esta semana termina o assunto de skills
com calma (o fluxo, o progressive disclosure e como validar a skill de outra pessoa) e
passa pro outro lado: dar ao agente uma **capacidade** que ele não tem, com um MCP server
escrito por você.

**Fio condutor:** *Skill ensina. Tool faz.*

## O que você vai fazer

- **Aula 7:** Kahoot de revisão das semanas 1 a 3; o que é uma tool na prática; a
  taxonomia do MCP (host, client, server; tools, resources, prompts); quanto uma tool
  conectada custa na janela; quando vale conectar um MCP; um cenário real do OWASP Top 10
  para LLM. No fim, o **LAB 2**: o seu primeiro MCP server conectado no Claude Code, com a
  conversa entre os dois gravada num log.
- **Aula 8:** você constrói o MCP server do seu projeto enquanto a facilitadora constrói
  o dela, com checkpoint a cada 20 minutos. No meio, três riscos acontecem ao vivo:
  prompt injection, improper output handling e supply chain de MCP de terceiro.

## Como usar

1. Sincronize o seu fork e entre nesta pasta.
2. Durante as aulas, siga o [`GUIA-DO-ALUNO.md`](./GUIA-DO-ALUNO.md).
3. Depois, faça o [`ENTREGAVEL.md`](./ENTREGAVEL.md).

## O que tem aqui

```
.
|-- README.md                          <- este arquivo
|-- GUIA-DO-ALUNO.md                   <- os labs passo a passo + erros comuns
|-- ENTREGAVEL.md                      <- a atividade da semana + tema sugerido MCP Brasil
|-- REFERENCIAS.md                     <- todas as fontes, verificadas
|-- P [M2] - S4 - Skills, Tools e MCP.pptx
|-- excalidraw/aula8-lab-guiado.excalidraw
`-- starter/
    |-- meu-primeiro-mcp/              <- LAB 2 e base do entregável (JS + SDK oficial v2)
    |-- decisao-escopo-template.md     <- o que a tool NÃO pode fazer
    `-- demos/
        |-- mcp-demo-vulneravel/       <- riscos 1 e 2 da aula 8 (inseguro de propósito)
        `-- supply-chain-sim/          <- risco 3 da aula 8 (simulação local e segura)
```

## Pré-requisitos

- **Node 20+** (`node -v`). O SDK oficial do MCP (`@modelcontextprotocol/server` 2.x)
  não roda no 18.
- Claude Code instalado e logado com a conta Claude. Nenhuma API key.
- Bloco assíncrono da semana: ver `ENTREGAVEL.md`.
- **Windows:** o mesmo terminal da aula 1 (Git Bash). Onde o comando muda no PowerShell, o
  guia mostra as duas versões.

## Caminho tecnológico

**JavaScript (ESM) com o SDK oficial v2, transporte stdio.** Sem TypeScript e sem build:
editou o `.mjs`, reconectou no `/mcp`. Quem preferir TypeScript usa o mesmo SDK do mesmo
jeito. Stdio porque o server roda na sua máquina, sem porta aberta e sem deploy.

## Regra da casa (continua valendo)

> **Você é responsável por cada linha que commita.**
> A partir desta semana, também por cada tool que você conecta.

---

## Registro de produção (27/09/2026)

**Decisões tomadas nesta versão (reversíveis):**

1. **Aula 8 é lab guiado paralelo** com os três riscos ao vivo, pedido do brief. O
   mapeamento de formatos previa red team em duplas; as duplas ficaram só no último bloco
   (leitura cruzada das descrições de tool).
2. **Starter reescrito em JavaScript**, sem build. O material anterior estava em TypeScript
   e dependia de `@modelcontextprotocol/server@^1.0.0`, **versão que não existe**: o pacote
   começou na 2.0.0 (27/07/2026, junto com a spec 2026-07-28). Testado com o SDK 2.1.0 e
   com o Claude Code 2.1.283 (`claude mcp add` + `claude mcp list` → `Connected`).
3. **`espiao.mjs`** novo em todo starter: grava o protocolo no `conversa.log`, sem
   dependência. É ele que torna "o que é uma tool na prática" visível e alimenta as 3
   perguntas do entregável.
4. **Correção do `allowed-tools`:** a semana 3 tratou o campo como restrição. A doc diz que
   ele pré-aprova as ferramentas listadas, sem pedir permissão, naquele turno; quem
   restringe é o `disallowed-tools`. Virou o slide 14 (a facilitadora assume em sala).
5. **OWASP com a numeração de 2026** (publicada em 03/08/2026): Prompt Injection LLM01,
   Excessive Agency LLM03, Supply Chain LLM04, Improper Output Handling LLM10. O curso
   assíncrono usa a de 2025; o slide 32 mostra a equivalência.
6. **Demo "Google Workspace" com o conector Google Calendar do claude.ai**, que aparece
   sozinho no Claude Code logado com a conta Claude. Os servers MCP oficiais do Google
   exigem projeto no Google Cloud + OAuth: pesado pra demo e pra aluno. Alternativa sem
   login no roteiro: Playwright MCP.
7. **O entregável mudou:** saiu o log de injeção do red team, entrou um MCP server com 2
   tools no projeto do aluno + `DECISAO-ESCOPO.md` + `EVIDENCIAS.md`. Tema sugerido pra quem
   não tem ideia: **MCP Brasil** (BrasilAPI, sem chave). Gabarito testado em
   `_facilitadora/mcp-brasil-referencia/` (fora do git).

**Pendências:**

- Preencher os 3 slots do deck no ensaio: S13, S28, S30.
- Plantar o convite de agenda da demo do S28 (texto no roteiro).
- Importar o Kahoot (`_facilitadora/kahoot/`) e rodar uma vez.
- Medir no ensaio o que o `/context` mostra pras tools de MCP com e sem tool search (a doc
  oficial não detalha a linha).
- Alura: o curso assíncrono usa a numeração OWASP 2025; confirmar se a turma fez antes da
  aula 8.

**Ganchos pra frente:** semana 5 pode assumir que todo aluno tem `mcp-server/` no projeto.
Semana 10 constrói o client do outro lado do mesmo protocolo (e é onde a spec 2026-07-28,
sem `initialize`, entra de verdade).

**Pós-aula (preencher):** quantos chegaram ao CP1, CP2, CP3 na aula 8 · achados do CP3 ·
itens do checklist de instalação de MCP de terceiro · o que quebrou nas demos.
