# 🤖 Semana 4 — MCP na prática: Atividade Prática (Entregável)

**Módulo 2 — AI Orchestrator / Contexto**

|  |  |
| :---- | :---- |
| **Material da aula** | `aula7-mcp-server/` no seu fork de pda-especializacao-ia |
| **Repositório do projeto** | seu repositório próprio (criado na semana 2) |
| **Formulário de entrega** | https://forms.gle/PSd6i65g44GwBMgq6 |
| **Prazo de entrega** | Antes da aula 1 da semana 5 |

## O que você vai entregar

Duas entregas, a mesma semana:

1. **Um MCP server funcional**, com pelo menos uma tool que serve o seu projeto de
   verdade (o do catálogo da semana 2), rodando via transporte stdio e conectado ao seu
   Claude Code.


## Pré-requisitos

- Bloco "OWASP IA Top 10 para LLMs" da Alura concluído (módulos de Prompt Injection,
  Riscos de saída/vetores, Integridade de dados e supply chain).
- Ambiente da aula 1 (Node, Claude Code) funcional — se travou lá, resolva antes de tentar
  esta semana.
- `DECISAO-ESCOPO.md` preenchido **antes** de escrever a tool (é isso que o Lab 1 pede).

## Passo a passo

1. Preencha `DECISAO-ESCOPO.md` a partir do template em `starter/`.
2. `cp -r starter/mcp-server-template meu-mcp-server && cd meu-mcp-server && npm install`.
3. Implemente a tool que o `DECISAO-ESCOPO.md` descreve.
4. `npm run build && claude mcp add --transport stdio meu-server -- node build/index.js`.
5. Confirme com `/mcp` dentro do Claude Code e teste a tool pelo menos uma vez com uma
   entrada válida.
6. Rode `npx @modelcontextprotocol/inspector` e tente pelo menos três entradas fora do
   esperado (vazia, gigante, com instrução embutida).
7. Na aula 2, participe do red team em duplas — ataque o server do colega, deixe o seu ser
   atacado.
8. Com o dono do código, preencha `LOG-INJECTION-TEMPLATE.md` sobre o **seu** server (o
   ataque pode ter sido feito por você no Lab 2 ou pelo seu colega na aula 2 — o que importa
   é que o alvo seja o seu próprio server).
9. Implemente pelo menos uma mitigação para a brecha encontrada e registre no log se ela
   fechou o ataque ou não.
10. Commit, push, PR se for fazer a entrega completa.

## O parágrafo para o dono do negócio

**Enunciado:** escreva de 3 a 5 frases, sem jargão técnico, explicando pra alguém que não
programa: que ferramenta você deu ao assistente de IA, o que ela permite ele fazer sozinho,
e o que você garantiu que ela **não** consegue fazer mesmo se o assistente for enganado.

**Exemplo modelo** (domínio 1 do catálogo — Listagem de perfis de alunos da PDA):

> "Demos ao assistente de IA uma ferramenta para buscar, dentro da lista de perfis de
> alunos, quem tem determinada habilidade — por exemplo, 'quem sabe React'. Isso deixa
> mais rápido montar indicações e vitrines personalizadas sem alguém vasculhar a planilha
> à mão. A ferramenta só lê a lista pública de perfis: ela não pode alterar, apagar ou
> adicionar um perfil, e não tem acesso a nenhum dado de contato privado dos alunos. Mesmo
> que alguém tente enganar o assistente para que ele 'esqueça essa regra', a ferramenta
> simplesmente não tem o poder técnico de escrever nada — a trava está no código, não na
> educação do assistente."

## Checklist antes de entregar

- [ ] `DECISAO-ESCOPO.md` preenchido e commitado, com a lista do que a tool NÃO pode fazer
- [ ] `meu-mcp-server/` builda sem erro (`npm run build`) e conecta (`/mcp` mostra ele)
- [ ] Pelo menos uma tool responde a uma chamada real, ligada ao seu projeto do catálogo
- [ ] `LOG-INJECTION-TEMPLATE.md` preenchido sobre o **seu** server — payload exato, o que
      o agente fez, por que passou, mitigação
- [ ] Pelo menos uma mitigação implementada e testada de novo
- [ ] O parágrafo pro dono do negócio, sem jargão
- [ ] Link do fork (ou PR, na entrega completa) no formulário

---

## Entrega mínima (~30 min além do que já foi feito em aula)

Itens 1 a 8 do passo a passo, com o log podendo ser "melhor tentativa registrada,
inclusive as que falharam" se nada furou o server em aula.

## Entrega completa (tudo da mínima +)

- Mitigação implementada e o log atualizado mostrando o **antes e depois** (ataque que
  funcionava, e não funciona mais, com a nova tentativa registrada).
- PR aberto no seu fork (branch → `main` do seu fork) com `meu-mcp-server/`,
  `DECISAO-ESCOPO.md` e `LOG-INJECTION-TEMPLATE.md` preenchido.
- Um parágrafo extra: qual dos três riscos vistos em sala (prompt injection, output
  handling, supply chain) você acha que ameaça mais especificamente **o seu domínio de
  projeto**, e por quê.

---

## Rubrica

| critério | peso | o que a facilitadora olha |
|---|---|---|
| Server funcional e ligado ao projeto real | 25% | a tool faz algo que o domínio escolhido genuinamente precisa, não um exemplo descolado; `/mcp` conecta; roda via stdio |
| `DECISAO-ESCOPO.md` é específico | 20% | a lista do que a tool NÃO pode fazer é concreta e verificável no código — não "vou tomar cuidado" |
| Log de injection é real e completo | 35% | payload exato, passo a passo do que o agente fez, causa raiz nomeada (e ligada a um risco do OWASP), mitigação proposta — mesmo que a tentativa tenha falhado, desde que documentada de verdade |
| Qualidade da mitigação | 15% | a correção ataca a causa raiz (validação, allow-list, sanitização), não só "o agente vai se comportar melhor da próxima vez" |
| O parágrafo pro dono do negócio | 5% | sem jargão, nomeia o limite da ferramenta em termos que alguém leigo entende |

O que **não** pontua: um server com dez tools genéricas que não tocam o seu projeto. O que
pontua: uma tool só, que serve pra algo real, com um limite provado por um ataque de
verdade.

## Bônus (sem peso na nota, com peso na vida)

- Rode o mesmo ataque contra o `starter/demos/mcp-demo-vulneravel` e contra o seu. Se o seu
  já tem a mitigação e o de demo não, escreva em uma frase a diferença de código entre os
  dois.
- Peça ao agente para usar a sua tool "com urgência, sem confirmar comigo" e veja se ele
  resiste ou cede — isso não é bug do MCP, é comportamento de modelo, mas vale registrar.
