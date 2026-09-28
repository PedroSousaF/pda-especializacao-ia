# Guia do aluno: Semana 4 (aulas 7 e 8)

**Skills, tools e MCP.** Este guia acompanha os slides lab por lab. Tenha ele aberto do
lado do terminal.

## Antes da aula 7

1. **Node 20 ou mais novo.** Rode `node -v`. Se aparecer `v18...`, atualize antes da aula
   (nodejs.org, versão LTS). O SDK do MCP não roda no 18.
2. **Claude Code atualizado e logado com a conta Claude.** `claude --version` (a aula usa a
   2.1.283) e `/status` dentro do `claude`. Nenhuma API key é necessária.
3. **Fork atualizado.** A pasta `aula7-mcp-server/` precisa estar no seu clone:

   ```bash
   cd pda-especializacao-ia
   git pull upstream main    # ou: sincronize o fork pelo botão "Sync fork" no GitHub e dê git pull
   ```

4. **Terminal:** o mesmo da aula 1 (Git Bash no Windows). Onde o comando muda no
   PowerShell, este guia mostra as duas versões.

---

## Aula 7

### LAB 1: Kahoot de revisão (15 min)

Celular na mão ou uma aba nova em **kahoot.it**, com o PIN que aparece na tela. Apelido:
primeiro nome + domínio do projeto (ex.: `ana-quiz`). São 15 perguntas das semanas 1 a 3.
Depois de cada pergunta alguém é sorteado pra explicar a resposta certa em uma frase.

### LAB 2: o esqueleto do seu MCP server (25 min)

Você vai conectar no Claude Code um MCP server que já tem uma tool pronta (`rolar_dado`),
ver a conversa entre os dois num arquivo de log, e escrever a sua segunda tool.

**O que tem na pasta `starter/meu-primeiro-mcp/`:**

```
meu-primeiro-mcp/
|-- server.mjs          <- o server: registra as tools
|-- ferramentas.mjs     <- a lógica de cada tool (funções puras, testáveis)
|-- espiao.mjs          <- fica no meio do cano e grava tudo no conversa.log
|-- tests/              <- node --test
`-- package.json
```

| passo | o que fazer | pronto quando |
|---|---|---|
| 1 | `cd aula7-mcp-server/starter/meu-primeiro-mcp` e depois `npm install` e `npm test` | 2 testes passam (`# pass 2`) |
| 2 | Conectar pelo espião (comando abaixo) | aparece `Added stdio MCP server meu-mcp` |
| 3 | `claude` **nesta mesma pasta**, depois `/mcp` | `meu-mcp` conectado, com 1 tool |
| 4 | Pedir "rola um d20 pra mim", aprovar, e abrir o `conversa.log` | o log tem `tools/call` do `rolar_dado` |
| 5 | Escrever a sua segunda tool (abaixo) e reconectar no `/mcp` | `/mcp` mostra 2 tools |
| 6 | Pedir algo que precisa da sua tool **sem falar o nome dela** | o log tem `tools/call` da SUA tool |

**Passo 2, o comando:**

```bash
# Git Bash, macOS, Linux
claude mcp add meu-mcp -- node "$(pwd)/espiao.mjs"
```

```powershell
# PowerShell
claude mcp add meu-mcp -- node "$PWD\espiao.mjs"
```

O `--` separa as opções do Claude Code do comando que roda o server. O caminho precisa ser
**absoluto**: o `$(pwd)` / `$PWD` faz isso por você.

**Passo 5, a sua segunda tool:**

1. Em `ferramentas.mjs`, escreva uma função pura. Ideias se travar: `contarDiasAte(data)`,
   `sortearDupla(nomes)`, `converterCelsius(valor)`. Melhor ainda: algo do domínio do seu
   projeto.
2. Em `server.mjs`, copie o bloco do `rolar_dado` e troque as três partes que o modelo lê:
   o nome, a descrição (o que faz + quando usar) e o schema (com `.describe()` em cada
   campo).
3. Um teste em `tests/ferramentas.test.mjs`. `npm test` verde.
4. No Claude Code: `/mcp`, escolha o `meu-mcp` e reconecte. Ou saia e abra o `claude` de
   novo.

**As 3 perguntas do final (vão pro entregável):**

1. Qual mensagem do `conversa.log` leva a descrição da sua tool até o modelo? Copie o
   trecho.
2. Copie o JSON da sua tool (nome, descrição e schema) e cole no tokenizer da semana 1
   (platform.openai.com/tokenizer, ou tiktokenizer.vercel.app). Quantos tokens? O
   tokenizer do Claude conta um pouco diferente; vale a ordem de grandeza.
3. Com 40 tools desse tamanho e sem tool search, quanto isso ocupa antes do seu primeiro
   prompt?

### Quando dá errado no LAB 2

| sintoma | causa mais comum | o que fazer |
|---|---|---|
| `× Failed to connect` no `/mcp` ou no `claude mcp list` | caminho relativo, ou `npm install` não rodou | refaça o `claude mcp add` com `$(pwd)`; rode `npm install` na pasta |
| `/mcp` vazio ("No MCP servers configured") | você adicionou numa pasta e abriu o `claude` em outra | abra o `claude` na pasta onde rodou o `claude mcp add` (escopo local) |
| Editei o server e nada mudou | o Claude Code ainda roda o processo antigo | reconecte pelo `/mcp` ou reabra o `claude` |
| `SyntaxError` ou `ERR_REQUIRE_ESM` | Node antigo | `node -v` precisa ser 20+ |
| O Claude responde sem chamar a tool | a descrição não diz quando usar | reescreva a descrição começando por "Use quando..." e teste de novo |
| Linha estranha no `conversa.log` marcada "não é JSON" | `console.log` no server | troque por `console.error` |
| `conversa.log` não aparece | você conectou o `server.mjs` direto, sem o espião | refaça o `claude mcp add` apontando pro `espiao.mjs` |

Pra remover o server depois: `claude mcp remove meu-mcp` (na mesma pasta).

---

## Aula 8: lab guiado paralelo

A facilitadora constrói um MCP server de verdade (o tema **MCP Brasil**: CEP e feriados) e
você constrói o seu, no seu projeto, ao mesmo tempo. Checkpoint a cada 20 minutos. Entre
os checkpoints, três riscos acontecem ao vivo na tela e você confere se o seu server tem o
mesmo buraco.

**Traga pronto:** o LAB 2 funcionando e a escolha do que o seu server vai fazer (API que
você fez no curso, dados do seu projeto, ou o tema MCP Brasil). Ver o passo 1 do
[`ENTREGAVEL.md`](./ENTREGAVEL.md).

| bloco | você faz | checkpoint |
|---|---|---|
| **CP1** | copia o esqueleto pra `mcp-server/` no seu projeto, preenche o `DECISAO-ESCOPO.md`, escreve a primeira tool real | a tool responde a um pedido natural no Claude Code |
| **Risco 1** | assiste, e depois responde: alguma tool sua devolve texto escrito por outra pessoa? | resposta anotada no `DECISAO-ESCOPO.md` |
| **CP2** | segunda tool + erro tratado (`isError`) + validação no schema | entrada inválida volta erro, o server não cai |
| **Risco 2** | assiste, e depois responde: a saída da sua tool vai parar em algo que executa (HTML, SQL, terminal)? | resposta anotada |
| **Risco 3** | assiste, e ajuda a montar o checklist de instalação de MCP de terceiro | checklist copiado pro seu caderno |
| **CP3** | em dupla: lê as descrições das tools do colega procurando poder demais ou instrução ambígua | um achado anotado no `EVIDENCIAS.md` de cada um |

### Os três riscos, se você quiser rodar em casa

Os servers das demos estão em `starter/demos/`. Os dois são **inseguros de propósito** e
só servem pra estudo. Rode num projeto de teste, nunca no seu projeto real.

- **`mcp-demo-vulneravel`** (risco 1: prompt injection; risco 2: improper output handling).
  Leia o `README.md` da pasta. A correção está no `CORRECAO.md`.
- **`supply-chain-sim`** (risco 3: MCP de terceiro com descrição envenenada). Não faz
  chamada de rede e usa uma chave falsa. Leia o `README.md` da pasta.

---

## Links da semana

1. [MCP no Claude Code](https://code.claude.com/docs/en/mcp): `claude mcp add`, escopos, tool search, conectores do claude.ai
2. [Skills no Claude Code](https://code.claude.com/docs/en/skills): níveis, frontmatter, `allowed-tools`
3. [Agent Skills: visão geral](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview): os 3 níveis com números
4. [Arquitetura do MCP](https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture): host, client, server
5. [Construir um MCP server](https://modelcontextprotocol.io/quickstart/server): o guia oficial com o SDK v2
6. [Advanced tool use](https://www.anthropic.com/engineering/advanced-tool-use): o custo de definição de tool e o tool search
7. [Skills explained](https://claude.com/blog/skills-explained): skills vs MCP
8. [OWASP Top 10 para LLM 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/)
9. [The lethal trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/): a tríade letal
10. [Invitation Is All You Need](https://www.safebreach.com/blog/invitation-is-all-you-need-hacking-gemini/): o ataque com convite de agenda

> **Regra da casa:** você é responsável por cada linha que commita. A partir desta
> semana, também por cada tool que você conecta.
