# 🤖 Semana 4 — MCP server: Atividade Prática (Entregável)

**Módulo 2 — Contexto, memória e ferramentas do agente**

|  |  |
| :---- | :---- |
| **Material da aula** | `aula7-mcp-server/` no seu fork de pda-especializacao-ia |
| **Repositório do projeto** | seu repositório próprio (criado na semana 2) |
| **Formulário de entrega** | https://forms.gle/PSd6i65g44GwBMgq6 |
| **Prazo de entrega** | Antes da aula 1 da semana 5 |

No formulário você entrega o **link do repositório do seu projeto no GitHub**, com a
pasta `mcp-server/` commitada.

---

## O que você vai entregar

**Mínima:**

1. **Um MCP server com 2 tools** na pasta `mcp-server/` do seu projeto, que resolvem uma
   necessidade real dele. Pode chamar uma API que você fez no curso da PDA, ler dados do
   seu projeto, ou seguir o tema **MCP Brasil** descrito abaixo.
2. **`mcp-server/DECISAO-ESCOPO.md`** preenchido: o que cada tool pode fazer, o que ela
   não pode, e como o código garante isso.
3. **`mcp-server/EVIDENCIAS.md`** com três partes:
   - o trecho do `conversa.log` com o `tools/call` de cada tool, junto com o pedido que
     você fez ao Claude (o pedido não pode falar o nome da tool);
   - as respostas às 3 perguntas do LAB 2 (qual mensagem leva a descrição da tool até o
     modelo, quantos tokens a sua tool tem, quanto 40 tools desse tamanho custariam sem
     tool search);
   - um parágrafo: **por que isso é MCP e não skill**.
4. **`mcp-server/README.md`** curto: o que o server faz e o comando pra conectar.

**Completa (tudo da mínima +):**

5. **Erro tratado:** entrada inválida e serviço fora do ar voltam com `isError: true` e uma
   mensagem que ajuda, sem derrubar o server. Pelo menos um teste `node --test` pra
   lógica de cada tool.
6. **Uma skill que ensina o Claude a usar o seu MCP**, em `.claude/skills/<nome>/SKILL.md`
   no projeto: quando chamar as tools e o que fazer com o resultado.
7. **`.mcp.json` commitado** na raiz do projeto (escopo `project`), sem nenhum segredo
   dentro. Chave de API, se existir, vem de variável de ambiente.

---

## Por que essa atividade existe

Na semana 3 você ensinou o agente com uma skill. Esta semana você dá a ele uma
capacidade que ele não tinha: consultar ou fazer algo fora da conversa. A entrega comprova
três coisas que o agente não faz por você:

- **Escrever uma descrição de tool** que faz o modelo escolher a tool certa a partir de um
  pedido comum. Quem valida isso é o seu teste com pedido natural, não o código compilar.
- **Ler o protocolo:** apontar no log qual mensagem coloca a sua tool na janela do modelo e
  quanto ela custa.
- **Decidir o escopo:** o que a tool não pode fazer, escrito antes de ser necessário.

## Pré-requisitos

- **Bloco assíncrono da semana concluído:** curso *OWASP IA Top 10 para LLMs: protegendo
  aplicações e agentes inteligentes* na Alura (alura.com.br/curso-online-owasp-top-10-para-llms).
  Complemento opcional: *Model Context Protocol (MCP): integração e otimização em agentes
  de IA* (alura.com.br/curso-online-model-context-protocol). O curso usa a numeração
  OWASP de 2025; a aula usa a de 2026. Os nomes dos riscos são os mesmos.
- **LAB 2 da aula 7 feito:** o `meu-primeiro-mcp` conectado no seu Claude Code e o
  `conversa.log` gerado.
- **Node 20 ou mais novo** (`node -v`). O SDK oficial do MCP não roda no 18.
- Claude Code instalado e logado com a conta Claude (nenhuma API key é necessária).

### Material de apoio (sem Alura)

- [Arquitetura do MCP](https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture): host, client, server e as primitivas.
- [Construir um MCP server](https://modelcontextprotocol.io/quickstart/server): o guia oficial, com o SDK que a gente usa.
- [MCP no Claude Code](https://code.claude.com/docs/en/mcp): `claude mcp add`, escopos, tool search.
- [OWASP Top 10 para LLM](https://genai.owasp.org/llm-top-10/): a lista e uma página por risco.

---

## Passo a passo

### 1. Escolha o que o seu server vai fazer

Três caminhos, escolha um:

| caminho | quando escolher | exemplo de tools |
|---|---|---|
| **API que você fez no curso da PDA** | você tem uma API rodando (mesmo que local) | `buscar_aluno_por_skill`, `listar_vagas_abertas` |
| **Dados do seu projeto** | seu projeto tem um JSON, CSV ou banco que o Claude hoje não consulta | `buscar_perfil`, `resultado_do_quiz` |
| **Tema MCP Brasil** | você não tem ideia ou não tem API pronta | `consultar_cep`, `feriados_do_ano` (ver seção abaixo) |

Ideias por domínio do catálogo da semana 2:

- **1. Perfis de alunos da PDA:** `buscar_perfil_por_habilidade`, `listar_perfis_incompletos`
- **2. Freelas e captação:** `consultar_cep` pra completar endereço de cliente, `dias_uteis_ate(data)` pra prazo de proposta
- **3. Quiz com Claude:** `listar_quizzes`, `resultado_por_turma`
- **4. Avaliação de projetos:** `checar_estrutura_entrega` (só leitura, numa pasta permitida)
- **5. Revisão de código com a voz da PDA:** `buscar_regra_de_estilo`, `listar_erros_comuns`
- **6. Problema da ONG ou das aulas:** `feriados_do_ano` pra calendário de aulas, `consultar_presenca`
- **7. Domínio próprio:** a pergunta é a mesma: o que o Claude precisa consultar ou fazer que hoje ele inventa ou não alcança?

**Teste do "precisa mesmo de MCP?"** (slide 31 da aula): se a resposta pra "precisa de dado
ou ação fora do repositório?" for não, você está escrevendo uma skill. Volte e escolha outra
coisa.

### 2. Copie o esqueleto pro seu projeto

```bash
# de dentro da raiz do SEU projeto
cp -r <caminho-do-fork>/aula7-mcp-server/starter/meu-primeiro-mcp mcp-server
cd mcp-server
npm install
npm test
```

Troque o `name` no `package.json` e no `new McpServer({ name: ... })` do `server.mjs` pelo
nome do seu server. Adicione `mcp-server/node_modules/` e `mcp-server/conversa.log` ao
`.gitignore` do projeto (se o `.gitignore` do starter não vier junto).

### 3. Preencha o `DECISAO-ESCOPO.md` antes do código

Copie `aula7-mcp-server/starter/decisao-escopo-template.md` para `mcp-server/DECISAO-ESCOPO.md`
e preencha. É a única parte desta semana que o agente não decide por você: ele escreve a
função, mas não sabe o que é perigoso no seu projeto.

### 4. Escreva as duas tools

Para cada tool:

1. **A lógica** vai em `ferramentas.mjs`, como função pura (recebe dados, devolve dados).
   Chamada de API também mora aqui.
2. **O registro** vai em `server.mjs`, com `server.registerTool(nome, { description,
   inputSchema }, handler)`.
3. **A descrição** diz o que a tool faz e quando usar. Coisa importante vai no começo: o
   Claude Code corta descrição em 2.048 caracteres.
4. **Todo parâmetro** tem `.describe("...")` com exemplo.
5. **A resposta** devolve só o que a tarefa precisa. Campo a mais é token a mais na janela, e
   às vezes dado que não devia sair (ver o CNPJ no tema MCP Brasil).
6. **Nada de `console.log`** no server. Pra depurar, `console.error`.

Pode usar o Claude Code pra escrever o código. A descrição e o escopo, escreva você e
confira se o modelo entende.

### 5. Conecte e prove com pedido natural

```bash
# de dentro de mcp-server/  (Git Bash, macOS, Linux)
claude mcp add meu-server -- node "$(pwd)/espiao.mjs"

# PowerShell
claude mcp add meu-server -- node "$PWD\espiao.mjs"
```

Abra o `claude` **na mesma pasta** (escopo local), rode `/mcp` e confira que as duas tools
aparecem. Faça um pedido **que não fala o nome da tool** e veja o Claude escolher ela.
Exemplo ruim: "use a tool consultar_cep com 01310100". Exemplo bom: "qual o endereço do
CEP 01310-100?".

Se o Claude não escolher a sua tool, a descrição é o primeiro suspeito. Reescreva e teste
de novo (depois de editar o server, reconecte no `/mcp` ou reabra o `claude`).

### 6. Escreva o `EVIDENCIAS.md`

Abra o `conversa.log` (o `espiao.mjs` grava tudo que passa entre o Claude Code e o seu
server) e monte o arquivo:

```markdown
# Evidências

## Tool 1: <nome>
Pedido que eu fiz: "<pedido sem o nome da tool>"
<trecho do conversa.log com o tools/call e a resposta>

## Tool 2: <nome>
...

## As 3 perguntas do LAB 2
1. A mensagem que leva a descrição das minhas tools até o modelo é ...
2. A minha tool <nome> tem ___ tokens (medido em platform.openai.com/tokenizer).
3. Com 40 tools desse tamanho, sem tool search: ___ tokens antes do primeiro prompt.

## Por que isso é MCP e não skill
<um parágrafo>
```

### 7. (Completa) Erros, testes, skill e `.mcp.json`

- **Erro:** no handler, `try/catch` em volta da chamada; no erro, devolva
  `{ content: [{ type: "text", text: "mensagem útil" }], isError: true }`. Teste
  desligando a internet ou passando entrada inválida.
- **Teste:** um arquivo em `mcp-server/tests/` por tool. Quando a tool chama API, a função
  recebe o `fetch` como parâmetro e o teste passa um `fetch` falso (a facilitadora mostra
  isso ao vivo na aula 8).
- **Skill:** `.claude/skills/<nome>/SKILL.md` com `description` no formato "Faz X. Use
  quando Y." e o corpo dizendo quando chamar cada tool e o que fazer com o resultado. Se
  você puser a tool no `allowed-tools`, ela roda **sem pedir permissão** naquele turno:
  justifique no próprio `SKILL.md` ou deixe de fora.
- **`.mcp.json`:** da raiz do projeto, `claude mcp add --scope project meu-server -- node mcp-server/server.mjs`
  (e abra o `claude` sempre da raiz, porque o caminho é relativo).
  Abra o arquivo gerado e confira que não tem chave nenhuma dentro. Se a sua tool precisa
  de chave, use `${NOME_DA_VARIAVEL}` no `.mcp.json` e documente no README.

### 8. Commit e entrega

Commit, push, e confira num navegador anônimo que `mcp-server/` aparece no GitHub. Link do
repositório no formulário.

---

## Tema sugerido: MCP Brasil

Pra quem não tem ideia ou não tem API pronta. Usa a [BrasilAPI](https://brasilapi.com.br),
pública e sem chave. Serve pra vários domínios: completar endereço de cliente (freelas),
calendário de aulas e prazos (ONG, quiz), cadastro de alunos (perfis).

**Tool 1: `consultar_cep`**

1. Em `ferramentas.mjs`, uma função que limpa o CEP (só dígitos, 8 no total, senão erro) e
   chama `https://brasilapi.com.br/api/cep/v2/<cep>`.
2. Se a resposta for 404, devolva `null`. Se for outro erro, lance um erro com o status.
3. Devolva **só** `cep`, `rua`, `bairro`, `cidade`, `uf`. A API manda mais coisa
   (coordenadas, serviço de origem). Você decide o que entra na janela do modelo.
4. Em `server.mjs`, registre com uma descrição que diga quando usar ("quando a pessoa
   passar um CEP ou precisar completar um endereço") e o schema `cep: z.string()`.

Ponto de partida pra função (o resto é seu):

```js
export async function consultarCep(cep) {
  const digitos = String(cep).replace(/\D/g, "");
  if (digitos.length !== 8) throw new Error("CEP precisa ter 8 dígitos");
  const resposta = await fetch(`https://brasilapi.com.br/api/cep/v2/${digitos}`, {
    headers: { "User-Agent": "meu-mcp/0.1 (curso PDA)" },
    signal: AbortSignal.timeout(8000),
  });
  // TODO: 404 -> null; outro erro -> throw; ok -> só os 5 campos
}
```

**Tool 2: `feriados_do_ano`**

1. Chama `https://brasilapi.com.br/api/feriados/v1/<ano>`.
2. Devolva uma lista de `{ data, nome }`.
3. Schema: `ano` inteiro, com mínimo e máximo razoáveis.
4. Teste de fogo com pedido natural: "quais feriados caem em novembro de 2026?" O Claude
   precisa escolher a tool sozinho.

**Desafio (conta como tool extra, não substitui as duas): `consultar_empresa`**

`https://brasilapi.com.br/api/cnpj/v1/<cnpj>` devolve dados públicos de uma empresa,
**incluindo o nome dos sócios**. A sua tool devolve razão social, situação cadastral,
atividade principal, cidade e UF, e corta os sócios fora. Escreva no `DECISAO-ESCOPO.md` por
quê (dica: risco LLM02 da lista OWASP).

**Dois tropeços conhecidos:**

- **403 no CNPJ:** esse endpoint recusa pedido sem `User-Agent` próprio. Mande um, como no
  exemplo acima.
- **Internet da sala:** teste a lógica com `fetch` falso no `node --test`, pra não depender
  da rede.

---

## O parágrafo para o dono do negócio

Escreva no `README.md` do `mcp-server/`, em 3 a 5 frases, sem jargão: que problema o
server resolve e pra quem. Exemplo (domínio 2, freelas, tema MCP Brasil):

> Hoje, quando a gente pede pra uma IA montar uma proposta pra um cliente, ela às vezes
> escreve o endereço errado ou inventa o bairro, porque não tem como consultar nada. Agora
> o assistente consulta o CEP e o CNPJ direto na base pública do governo e preenche a
> proposta com os dados certos. Ele também sabe quais dias são feriado, então o prazo de
> entrega que ele sugere já desconta esses dias. E ele só vê o que precisa: o nome dos
> sócios da empresa, por exemplo, nunca chega até ele.

## Checklist antes de entregar

- [ ] `mcp-server/` está no repositório do **seu projeto**, não no fork do curso.
- [ ] As duas tools aparecem no `/mcp` e funcionam.
- [ ] Cada tool foi chamada a partir de um pedido que **não fala o nome dela**, e o
      `EVIDENCIAS.md` mostra o pedido e o trecho do log.
- [ ] `DECISAO-ESCOPO.md` preenchido, com a seção "como isso é garantido no código" sem
      "vou tomar cuidado".
- [ ] As 3 perguntas do LAB 2 respondidas, com número de tokens medido.
- [ ] O parágrafo "por que isso é MCP e não skill" existe e é seu.
- [ ] Nenhum `console.log` no server. Nenhuma chave no código nem no `.mcp.json`.
- [ ] `node_modules/` e `conversa.log` fora do commit.
- [ ] (Completa) Erro com `isError`, teste por tool, skill que usa o MCP, `.mcp.json`.

---

## Rubrica

| critério | peso | o que eu olho |
|---|---|---|
| Server funcional com 2 tools úteis | 30% | conecta, as duas tools respondem, resolvem algo do projeto (não é `ping` nem o dado do lab) |
| Descrição que funciona | 20% | o `EVIDENCIAS.md` mostra o Claude escolhendo cada tool a partir de pedido natural |
| Escopo decidido | 20% | `DECISAO-ESCOPO.md` com o que a tool não pode fazer e como o código garante |
| Leitura do protocolo | 15% | as 3 perguntas respondidas com o trecho certo do log e o número de tokens medido |
| Skill vs MCP | 15% | o parágrafo explica com o seu caso, não com definição copiada |

Faixa completa: os itens 5 a 7 entram como condição pra nota máxima (todos presentes e
funcionando).

O que **não** pontua: server que só tem a tool do lab; pedido de teste que fala o nome da
tool; `DECISAO-ESCOPO.md` com "vou tomar cuidado" como garantia; chave de API commitada
(essa zera o critério de escopo).

## Bônus (sem peso na nota, com peso na vida)

- Rode o seu server no MCP Inspector (`npx @modelcontextprotocol/inspector node server.mjs`,
  precisa de Node 22.19+) e leia as suas descrições como um estranho leria.
- Peça pra alguém da turma ler as descrições das suas tools procurando poder demais ou
  instrução ambígua. Registre o que a pessoa achou no `EVIDENCIAS.md`.
