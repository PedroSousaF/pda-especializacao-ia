# 🤖 Semanas 5 e 6 — Glossário, spec e RPI no Desafio Frontend: Atividade Prática (Entregável)

**Módulo 2 — AI Orchestrator / Contexto**

|  |  |
| :---- | :---- |
| **Material da aula** | `aula9-engenharia-para-ia/` e `aula11-diagnostico-documentos-rpi/` no seu fork de pda-especializacao-ia |
| **Repositório do projeto** | seu fork de `github.com/oliviasmim/frontend-challenge` |
| **Formulário de entrega** | https://forms.gle/PSd6i65g44GwBMgq6 |
| **Prazo de entrega** | Antes da aula 1 da semana 7 |

Nestas duas semanas o projeto não é o seu: é o **Desafio Frontend — Marketplace de
NFTs**, um desafio técnico real de contratação. O `README.md` dele é o enunciado e faz o
papel do dono do negócio: todo termo do glossário, todo cenário e todo critério EARS que
você escrever precisa apontar para uma frase dele. Você **não** vai implementar o
desafio inteiro. Vai especificar uma parte dele direito e, na faixa completa, construir
essa parte.

O que você entrega no formulário é o **link do seu fork do frontend-challenge no
GitHub**, com os arquivos das duas semanas commitados (e, na faixa completa, um PR
aberto dentro do seu fork — ver passo 8 do passo a passo).

Versão em .docx (mesmo conteúdo):
[`Semanas 5 e 6 - Glossario, spec e RPI - Atividade Pratica.docx`](./Semanas%205%20e%206%20-%20Glossario,%20spec%20e%20RPI%20-%20Atividade%20Pratica.docx).

---

## O que você vai entregar

**Mínima:**
1. Um `GLOSSARIO.md` do marketplace (semana 5): 2 bounded contexts com a pasta onde cada
   um vai morar, 3 termos por contexto e 1 palavra que muda de sentido entre eles, tudo
   tirado do README do desafio.
2. Uma feature especificada com OpenSpec ou TLC (semana 5), mexendo em um contexto só,
   com o validador passando sem erro e um `DIFERENCAS.md` de 3 linhas.
3. O `RESEARCH.md`, a ADR (`docs/adr/0001-<slug>.md`) e o documento enxuto
   (`docs/<slug>-spec.md`) com 5 critérios EARS e 3 cenários BDD em Gherkin (semana 6),
   sobre um problema de escala M do desafio.

**Completa (tudo da mínima +):**
4. A **Sessão 3 — Implement** rodada: a parte especificada implementada com a stack do
   README e os 3 cenários BDD passando como teste Playwright.
5. A feature da semana 5 especificada **também na outra ferramenta** (quem usou OpenSpec
   faz no TLC e vice-versa), com um parágrafo comparando as duas.
6. Um **PR aberto dentro do seu fork** com tudo isso e um `REVIEW.md` curto.

---

## Material de apoio

Turmas sem acesso à Alura: comece por aqui em vez dos blocos indicados no `README.md` das
aulas 9 e 11. São leituras curtas que cobrem o mesmo terreno — como tirar glossário e
fronteira de um texto de requisitos, e como transformar requisito em critério
verificável:

- [DDD na Prática, parte 2: locadora de veículos](https://douglasalonso.medium.com/ddd-na-pr%C3%A1tica-parte-2-ee3cedd26125) — 16 histórias viram glossário e bounded contexts. É o mesmo exercício que você vai fazer com o README do desafio.
- [DDD: Bounded Context](https://www.fabriciorissetto.com/blog/ddd-bounded-context/) — "Produto" em Vendas e em Suporte: a mesma palavra com dois sentidos, que é o que o seu `GLOSSARIO.md` precisa encontrar.
- [Usando todo o poder do Gherkin](https://dgosantos89.github.io/Gherkin-p1/) — Gherkin em português, com exemplo ruim e corrigido. Leia antes de escrever os cenários à mão.
- [Critérios de aceitação para histórias de usuários](https://medium.com/@lilianborbadeoliveira/crit%C3%A9rios-de-aceita%C3%A7%C3%A3o-para-hist%C3%B3rias-de-usu%C3%A1rios-no-agile-finalidades-formatos-exemplos-e-e00ad43d3543) — a diferença entre critério como regra e critério como cenário Dado/Quando/Então.
- [EARS — guia oficial de Alistair Mavin](https://alistairmavin.com/ears/) — os 5 padrões, com o gabarito de frase de cada um. Em inglês, mas curto: use como consulta ao revisar os seus 5 critérios.
- [Advanced Context Engineering for Coding Agents](https://www.humanlayer.dev/blog/advanced-context-engineering) — a origem do fluxo Research → Plan → Implement em sessões separadas. Em inglês; leia a parte sobre RPI.
- [OpenSpec](https://github.com/Fission-AI/OpenSpec) e [TLC spec-driven](https://agent-skills.techleads.club/tlc-spec-driven/) — instalação e comandos das duas ferramentas. Consulta, não leitura corrida.

## Pré-requisitos

- Ter lido pelo menos um material da lista acima (ou os blocos da Alura das semanas 5 e
  6, se você tiver acesso).
- Ter acompanhado os labs da aula 9 (glossário e primeira spec) e da aula 11 (Research e
  Plan). O passo a passo abaixo repete os mesmos movimentos, agora em cima do desafio.
- Node 20.19 ou mais novo e git funcionando (o OpenSpec exige essa versão do Node). Para
  o TLC, Python 3 no PATH (`python3` ou `py`). Sem Python, o agente confere a spec lendo,
  e você anota que não rodou o script.
- **Chegar na aula 10 com o `GLOSSARIO.md` e a change validada** — a rodada 2 do
  Excalidraw é troca de spec com o trio.
- **Chegar na aula 12 com o `RESEARCH.md` pronto** — no rodízio do diagnóstico, um
  colega continua o seu quadro só lendo o que você escreveu.

## Passo a passo

1. **Faça o fork e leia o enunciado.** Abra `github.com/oliviasmim/frontend-challenge`,
   clique em **Fork** e clone o seu fork
   (`git clone https://github.com/<seu-usuario>/frontend-challenge.git`). Leia o
   `README.md` inteiro uma vez **antes** de abrir o agente e marque os substantivos que
   se repetem.
2. **(Semana 5) Escreva o `GLOSSARIO.md`** (LAB 1 da aula 9). Peça ao agente só o
   levantamento: "Não altere nenhum arquivo. Leia o README.md e liste os substantivos de
   domínio que aparecem nele. Para cada um, diga em quais seções aparece. Não sugira
   nomes novos e não explique o que eles significam." Quem decide o significado é você:
   preencha o template do glossário (slide S24 da aula 9) na raiz do fork. Ainda não
   existe código, então escreva a pasta que **deveria** existir (`src/<pasta>/`). Se não
   achar a palavra que muda de sentido, procure no README uma palavra que aparece em duas
   seções com significados diferentes.
3. **(Semana 5) Especifique uma feature com OpenSpec ou TLC** (LAB 2 da aula 9). Número
   par na chamada: OpenSpec. Ímpar: TLC.
   - Escolha uma feature pequena que mexe em **um contexto só** do seu glossário — por
     exemplo, busca e filtros que sobrevivem ao refresh, ou cupom no carrinho.
   - Escreva 3 cenários em Gherkin **à mão**, sem abrir o agente, com os termos do
     glossário e números concretos.
   - Par: `npm install -g @fission-ai/openspec@latest` e
     `openspec init --tools claude --language pt-BR`. Cole o `GLOSSARIO.md` em
     `openspec/config.yaml`, embaixo de `context: |`.
   - Ímpar: `npx @tech-leads-club/agent-skills install -s tlc-spec-driven -a claude-code`.
     Cole o `GLOSSARIO.md` no fim do `CLAUDE.md`.
   - Rode o prompt do slide S44 da aula 9 e valide com
     `openspec validate <nome-da-change>` (par) ou
     `python3 .claude/skills/tlc-spec-driven/scripts/validate_spec.py .specs/features/<feature>`
     (ímpar).
   - Escreva o `DIFERENCAS.md` com 3 linhas: uma coisa que o agente acrescentou, uma que
     ele mudou nos seus cenários e uma pergunta que ele fez (ou "não fez pergunta
     nenhuma", que também é achado).
4. **(Semana 6) Sessão 1 — Research**, numa sessão nova de agente. Use o prompt "Sessão 1
   — Research" de
   [`aula11-diagnostico-documentos-rpi/starter/prompts-rpi.md`](../aula11-diagnostico-documentos-rpi/starter/prompts-rpi.md):
   no lugar do domínio, escreva "marketplace de NFTs do Desafio Frontend"; no lugar do
   parágrafo da semana 2, cole o trecho do README que descreve o problema. Quem sente a
   dor é o **colecionador** que está comprando. Bons candidatos de escala M:
   - o preço ou a disponibilidade muda com o NFT já no carrinho, e o checkout não pode
     confirmar com cotação desatualizada (seção 7 do README);
   - clique repetido ou timeout no pagamento não pode gerar dois pedidos (seção 3,
     "Pagamento e confirmação");
   - a sessão expira no meio do checkout e o colecionador não pode perder o que estava
     fazendo (seção 3, "Conta e sessão").
   - Gere o `RESEARCH.md` a partir de
     [`starter/RESEARCH-template.md`](../aula11-diagnostico-documentos-rpi/starter/RESEARCH-template.md).
     Ele fala da dor de quem compra, **sem** nome de tecnologia: nada de Socket.IO, MSW
     ou TanStack aqui.
5. **(Semana 6) Sessão 2 — Plan**, em outra sessão nova. Cole **só** o conteúdo do
   `RESEARCH.md` (não a conversa da sessão 1), o nome do bounded context e os termos dele
   do seu `GLOSSARIO.md`. O prompt "Sessão 2 — Plan" pede os dois documentos:
   `docs/adr/0001-<slug>.md` e `docs/<slug>-spec.md`.
   - Revise cada um dos 5 EARS: ao lado de cada critério, anote a frase do `RESEARCH.md`
     e a seção do README de onde ele veio. Critério sem origem não entra — reescreva ou
     apague.
   - Confira se pelo menos 1 dos 3 cenários BDD cobre erro ou limite, não só o caminho
     feliz.
6. **(Completa) Sessão 3 — Implement**, sessão nova de novo. Cole só a ADR e a spec já
   revisadas e implemente a parte especificada com as tecnologias da stack do README que
   ela usa. Os 3 cenários BDD viram testes Playwright e passam com
   `npx playwright test`. Não precisa montar o desafio inteiro nem fazer deploy.
7. **(Completa) Repita a feature da semana 5 na outra ferramenta** e acrescente ao
   `DIFERENCAS.md` um parágrafo: qual perguntou mais, qual inventou mais, qual você usaria
   neste projeto e por quê.
8. **Commit e push** no seu fork. Na faixa completa, abra um PR **dentro do seu fork** com
   tudo isso e um `REVIEW.md` curto: o que você pediu na sessão de Plan, o que o agente
   devolveu e o que você rejeitou ou reescreveu nos EARS e no BDD, e por quê.
   - Atenção: o GitHub sugere abrir o PR contra `oliviasmim/frontend-challenge`. Troque o
     **base repository** para o seu fork antes de criar.
9. Cole o link do seu fork (ou do PR, na faixa completa) no formulário de entrega.

## Checklist antes de entregar

- [ ] O `GLOSSARIO.md` tem 2 contextos com pasta, 3 termos cada e 1 palavra que muda de
      sentido. Nenhum termo é `Manager`, `Handler`, `Service` ou `Util`, e todos aparecem
      no README do desafio.
- [ ] A feature da semana 5 mexe em um contexto só, o validador sai sem erro e o
      `DIFERENCAS.md` tem as 3 linhas.
- [ ] O `RESEARCH.md` descreve a dor do colecionador com quem, quando e quanto custa, sem
      nome de tecnologia.
- [ ] Research, Plan e Implement rodaram em **sessões separadas**, cada uma recebendo só
      o artefato da anterior.
- [ ] Os 5 padrões EARS aparecem, e cada critério aponta a frase do `RESEARCH.md` de onde
      veio.
- [ ] Os 3 cenários BDD estão em Gherkin (Dado/Quando/Então), com pelo menos 1 de erro ou
      limite.
- [ ] (Completa) Os 3 cenários passam em `npx playwright test`, e o PR com `REVIEW.md`
      está aberto dentro do seu fork.
- [ ] O link colado no formulário é do **seu fork do frontend-challenge**, não do fork do
      curso.
