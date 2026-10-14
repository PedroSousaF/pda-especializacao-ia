# Slides: Semana 5, aula 9. Engenharia de software na era da IA: clean code, DDD e spec

**49 slides, aula 1 (aula 9).** A aula 10 é Excalidraw coletivo e não tem deck (só o S47
anuncia).

Esta versão substitui o outline anterior (que continua no histórico do git). Mudou o
foco: a aula sai da revisão de código plantado e vai pra **escrever spec com DDD e BDD**
e entregar essa spec pro agente com **OpenSpec** e **TLC spec-driven**. O projeto da
demo é um **quiz ao vivo estilo Kahoot da PDA** (`_facilitadora/demo-quiz-pda/`).

**Fio condutor:** "Pronto é o que está escrito." Abre no S5, volta no S25 (critério de
aceite) e no S38 (validate barrando spec vaga), fecha no S48.

**Tudo que aparece como saída de agente ou de terminal foi rodado de verdade** nesta
preparação (05/10, OpenSpec 1.14.0, tlc-spec-driven 3.3.0, Claude Code), no
`demo-quiz-pda`. As saídas estão em `_facilitadora/plano-b/`. Se a demo ao vivo travar,
abra o arquivo correspondente.

**Imagens:** 13 GIFs gerados no template (`img/gif-*.gif`, com o último quadro em
`-ultimo.png` pra conferir) e 9 imagens de terceiros (`_facilitadora/img-ref/ref-*`), com crédito na
linha `ref:`. Nenhum slot vazio.

## Rastreio dos objetivos

| Objetivo (semana + pedido de hoje) | Slides |
|---|---|
| Identificar sinais de código ruim gerado por IA | S7–S12 |
| Abstraction Bloat + nomes equivalentes (Clean Architecture Paradox, Abstraction Illusion) | S11 |
| Clean code: nomeação, tamanho de função, responsabilidade única | S10 |
| DDD estratégico concreto: subdomínios, linguagem ubíqua, bounded context como fronteira pro agente | S14–S21, LAB 1 |
| BDD e critério de aceite como definição de pronto | S25–S31 |
| Por que funciona: ligação com context engineering (semanas 2, 3, 4) | S4, S13, S21, S32, S35 |
| OpenSpec com comandos e prompts no slide | S34–S39, LAB 2 |
| TLC spec-driven com comandos e prompts no slide | S40–S41, LAB 2 |
| Cenário do quiz estilo Kahoot da PDA | S6 em diante |
| Artigos em português pra ler no lab | S23 |

## Tempo

| hora | bloco | slides |
|---|---|---|
| 0:00–0:05 | Giro das IAs (curto hoje) | S1–S3 |
| 0:05–0:15 | Recap ativo: as semanas 2, 3 e 4 viram uma pergunta só | S4–S5 |
| 0:15–0:35 | Bloco 1: o que o agente faz com pedido vago | S6–S13 |
| 0:35–0:50 | Bloco 2: DDD estratégico no quiz | S14–S21 |
| 0:50–1:05 | **LAB 1** glossário e fronteiras do seu projeto | S22–S24 |
| 1:05–1:30 | Bloco 3: critério de aceite, BDD, OpenSpec e TLC | S25–S41 |
| 1:30–1:55 | **LAB 2** sua primeira spec | S42–S45 |
| 1:55–2:00 | Fechamento | S46–S49 |

**Se atrasar, cortar nesta ordem:** S33 (níveis de SDD), S12 (checklist inteiro; fica
só o link), S31 (três formatos; fala em 1 frase no S29), S41 (TLC devolveu; mostra no
lab). Nunca cortar lab.

## Antes da aula (checklist do deck)

- Copiar `_facilitadora/demo-quiz-pda/` pra uma pasta fora do repo, rodar
  `git init -b main && git add -A && git commit -m "quiz PDA"` e `npm test` (4 testes
  verdes).
- **Não** rodar `openspec init` nem instalar o TLC no demo antes: a instalação é parte
  da demo.
- Deixar uma segunda cópia do demo já com OpenSpec e TLC instalados e o
  `config.yaml` preenchido, pro caso de a rede da sala travar o `npm install`.
- Ter Python 3 na máquina (os scripts de validação do TLC são Python).
- A change vaga do S38 é criada ao vivo no S35, depois do `openspec init` (comandos no S35).
- Abrir em abas: os 4 artigos do S23, o README do OpenSpec, a página do TLC.

---

## AULA 1

## S1: Capa

**Visual:** `img/gif-06-cronometro-pontos.gif` à direita (cronômetro do quiz contando
de 20 a 0 e a pontuação caindo de 1000 pra 500).

`SEMANA 5` · tag `</ENGENHARIA DE SOFTWARE NA ERA DA IA>`

Subtítulo: "Clean code, DDD e spec. Hoje a gente escreve o quiz da PDA."

Notas: `[00:00–00:01]` "O projeto de hoje é o Kahoot que vocês jogaram semana passada,
só que nosso. E a primeira coisa que eu vou fazer é pedir mal pro agente."

---

## S2: `</HOJE>`

**Visual:** diagrama com shapes: barra horizontal com os 8 blocos da tabela de tempo,
LAB 1 e LAB 2 em amarelo.

Kicker: `› AULA 9`

Linha de baixo da barra: "Você sai daqui com: um glossário do seu projeto, uma fronteira
desenhada e uma spec validada por ferramenta."

Notas: `[00:01–00:02]` mostrar onde estão os dois labs. "Dos 120 minutos, 40 são de
vocês."

---

## S3: `</GIRO DAS IAS>`

**Visual:** `_facilitadora/img-ref/ref-bockeler-sdd-visao-geral.png` (Birgitta Böckeler, Thoughtworks:
memory bank à esquerda, agente no meio, specs à direita).

Kicker: `› GIRO DAS IAS`

Uma notícia sugerida pra abrir (o resto do giro é seu): "A Thoughtworks testou três
ferramentas de spec-driven development (Kiro, spec-kit e Tessl) e publicou o que achou.
Spoiler: a crítica principal é excesso de markdown pra revisar. A gente volta nisso no
S33."

`ref: martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html`

Notas: `[00:02–00:05]` 3 minutos, uma notícia. Hoje o giro é curto porque o Bloco 3 é
longo.

---

## S4: `</RECAP>`

**Visual:** 3 cards (`01 / [S2]`, `02 / [S3]`, `03 / [S4]`), cada um com a frase-âncora
da semana.

Kicker: `› RECAP ATIVO · SORTEIO`

- `01 / [SEMANA 2]` **"Contexto é mesa de trabalho."** Pergunta: "O que acontece com a
  resposta do modelo quando a mesa está lotada?"
- `02 / [SEMANA 3]` **"Até você contar pra ela."** Pergunta: "Onde você conta pro
  agente uma coisa que ele precisa saber em toda sessão?"
- `03 / [SEMANA 4]` **"Skill ensina. Tool faz."** Pergunta: "Uma skill carrega inteira
  no começo da sessão?"

Notas: `[00:05–00:13]` sortear 3 pessoas, uma por card. Respostas esperadas: (1) cai na
Dumb Zone, o modelo esquece instrução do começo; (2) `CLAUDE.md`/`AGENTS.md`; (3) não,
só o nome e a descrição carregam no início, o resto quando é chamada (progressive
disclosure: revelar aos poucos). Fechar: "Hoje essas três respostas viram o motivo de
escrever spec. Guardem."

---

## S5: Fio condutor

**Visual:** `_facilitadora/img-ref/ref-wynne-example-mapping-cartoes.jpg` à direita (cartões coloridos e
canetas, foto de Matt Wynne, Cucumber).

Tag `</PRONTO É O QUE ESTÁ ESCRITO>`

Frase de apoio: "Se o critério de pronto só existe na sua cabeça, o agente escolhe um.
Hoje vocês vão ver qual ele escolhe."

`ref: cucumber.io/blog/bdd/example-mapping-introduction`

Notas: `[00:13–00:15]` frase da semana. Repetir nas transições dos slides S25, S38 e S48.

---

## BLOCO 1: o que o agente faz com pedido vago (0:15–0:35)

## S6: O projeto da demo: quiz ao vivo da PDA

**Visual:** terminal com a árvore do repo.

Kicker: `› O PROJETO`

```text
demo-quiz-pda/
|-- src/
|   |-- banco/perguntas.js       # a facilitadora escreve e publica o Quiz
|   |-- partida/sala.js          # Sala, PIN, apelido
|   |-- partida/rodada.js        # Rodada, Cronômetro, Resposta
|   |-- partida/placar.js
|   `-- diagnostico/relatorio.js # o que a turma mais errou
|-- tests/                       # node --test, zero dependência
`-- CLAUDE.md
```

Lado direito, 3 linhas: "**Hoje:** Resposta certa vale 1 ponto." / "**Pedido:** quem
responde mais rápido ganha mais." / "**Igual ao Kahoot** que a gente jogou na semana 4."

Notas: `[00:15–00:17]` "É pequeno de propósito. Quatro testes passando. Os nomes das
pastas já são do domínio: isso vai fazer diferença daqui a pouco."

---

## S7: Demo 1: o pedido vago

**Visual:** terminal com o comando e o prompt.

Kicker: `› DEMO 1 · AO VIVO`

```bash
cd demo-quiz-pda
claude
```

```text
adiciona pontuação por velocidade no quiz
```

Linha de baixo: "Antes de rodar: o que vocês acham que ele vai fazer com uma resposta que
chega depois do tempo acabar?"

Notas: `[00:17–00:20]` colar o prompt exatamente assim, sem nada além. Aceitar as edições.
Enquanto roda, pedir palpite no chat pra pergunta do slide. Plano B: abrir
`_facilitadora/plano-b/pedido-vago/diff.txt` e `saida.txt`.

---

## S8: Código limpo, regra inventada

**Visual:** `img/gif-12-pedido-vago-real.gif` (diff real + a linha de teste que trava 99 s
= 500 pontos + a frase do agente).

Kicker: `› O QUE VOLTOU`

Notas: `[00:20–00:23]` **Este é o ponto em que dá errado de propósito**, e deu errado de
verdade na preparação. O agente mexeu só em `src/partida/rodada.js` e no teste. O código
está bem nomeado. O problema é outro: `Math.min(t, limite)` faz uma Resposta que chega aos
99 segundos valer 500 pontos, e ele escreveu um teste garantindo isso. Ele também
escolheu a escala sozinho: "Escolhi a escala 500–1000 por ser parecida com a do Kahoot."
Perguntar: "Quem aqui ia perceber isso lendo o diff às 23h?" Se na sala o agente fizer
diferente (recusar a Resposta atrasada, escolher outra escala), a lição é a mesma: ele
**decidiu** uma regra que ninguém escreveu. Mostrar a decisão que ele tomou.

---

## S9: Prompt de diagnóstico

**Visual:** terminal com o prompt.

Kicker: `› COPIA E COLA`

```text
Não altere nenhum arquivo. Liste cada regra de negócio que você decidiu sem eu ter
pedido: valores, limites, o que acontece fora do tempo, empates. Para cada uma, diga o
arquivo, a linha e qual seria a alternativa.
```

Linha de baixo: "Você vai usar esse prompt no lab e no seu projeto. Ele não conserta
nada. Ele mostra o que foi decidido por você."

Notas: `[00:23–00:25]` rodar na mesma sessão da demo. O esperado é ele listar escala
500–1000, clamp em `limite`, `t` negativo vira 0. Anotar no quadro as decisões.

---

## S10: Três lentes de clean code no diff

**Visual:** terminal com o trecho real de `rodada.js` gerado na demo, com marcadores
`// 1` `// 2` `// 3` ligados aos `steps` à direita.

Kicker: `› CLEAN CODE`

```js
export const PONTOS_BASE = 500;                    // 1
export const PONTOS_BONUS = 500;
export function pontosPorVelocidade(t, limite) {   // 2
  const restante = 1 - Math.min(Math.max(t, 0), limite) / limite;
  return PONTOS_BASE + Math.round(PONTOS_BONUS * restante);
}
export function registrarResposta(rodada, jogadora, alternativa, t) { // 3
```

Steps:
1. **Nomeação.** `PONTOS_BONUS` é nome do agente ou da regra? Se a regra fala em
   "Resposta certa vale de 500 a 1000", o nome no código devia ajudar a achar essa frase.
2. **Tamanho de função.** Duas linhas, ótimo. Função curta esconde regra errada tão bem
   quanto função longa.
3. **Responsabilidade única.** `registrarResposta` registra, pontua e altera a Jogadora.
   Quem recusa Resposta atrasada, se um dia existir?

Notas: `[00:25–00:28]` o ponto: clean code ajuda a **ler** a regra, não garante que a
regra está certa. Por isso o resto da aula é sobre escrever a regra antes.

---

## S11: Quando o repo é maior: Abstraction Bloat

**Visual:** `img/gif-01-abstraction-bloat.gif` (ilustração: a mesma regra de uma linha
espalhada em 7 arquivos com Service, Strategy, Factory, Provider, Manager, Utils).

Kicker: `› O PADRÃO`

Cards embaixo:
- **Abstraction Bloat**: camada que não decide nada, só repassa.
- **Mesmo padrão, outros nomes:** Clean Architecture Paradox, Abstraction Illusion. Nomes
  usados em artigos e neste curso; não existe um termo padronizado na literatura.
- **Dado:** a GitClear mediu, em 623 milhões de mudanças (2023–2026), blocos duplicados
  +81% e refatoração −70%.

`ref: gitclear.com/the_ai_code_quality_maintainability_gap · arxiv.org/html/2605.02741v1`

Notas: `[00:28–00:30]` "No nosso repo pequeno, com pasta e nome de domínio, ele não
inchou. Em repo sem fronteira, com `utils/` e `helper.js`, é isso que aparece. Vocês viram
o `repo-plantado` da semana passada." Ser honesta: o GIF é ilustração.

---

## S12: Os 6 sinais pra caçar

**Visual:** grade de 6 cards numerados.

Kicker: `› CHECKLIST · starter/checklist-sinais-codigo-ia.md`

1. **Abstraction Bloat** (Classe Deus, Miragem Modular, Camada de Passagem, nome genérico)
2. **Duplicação** em vez de reuso
3. **Mascaramento de erro** (`catch` vazio, `|| 0`)
4. **API ou biblioteca alucinada**
5. **Defensividade sem necessidade** (`if` pra caso que não existe)
6. **Fronteira dissolvida** (um arquivo resolvendo dois contextos)

Linha de baixo: "O `Math.min` do S8 entra em qual? Em nenhum. Ele está **certo como
código** e errado como regra. Checklist pega forma; regra só a spec pega."

Notas: `[00:30–00:32]` passar rápido, o arquivo fica de referência pras semanas 7, 8 e 9.

---

## S13: Por que o agente decidiu sozinho

**Visual:** `img/gif-04-mesa-de-trabalho.gif` (pedido vago: o agente lê tudo e a barra de
contexto sobe pra Dumb Zone; pedido com spec: lê glossário, spec e uma pasta, fica na
Smart Zone).

Kicker: `› CONTEXT ENGINEERING`

Três linhas:
- **Lacuna vira média.** O que o prompt não diz, o modelo completa com o padrão mais
  comum que ele viu. "Parecido com o Kahoot" é exatamente isso.
- **Pedido vago enche a mesa.** Sem saber onde mexer, ele lê mais arquivo pra descobrir.
  Mais token, menos atenção pra regra.
- **Spec é contexto que você escolhe.** Glossário, critério e pasta certa entram; o resto
  fica fora.

Notas: `[00:32–00:35]` amarrar com a semana 2: "contexto é mesa de trabalho, não
depósito". O GIF é ilustração de proporção. Fechar o bloco: "Pra escolher o que vai na
mesa, preciso de duas coisas: saber onde o meu sistema se divide e saber dizer o que é
pronto. A primeira é DDD."

---

## BLOCO 2: DDD estratégico no quiz (0:35–0:50)

## S14: Bounded context, a definição

**Visual:** `_facilitadora/img-ref/ref-fowler-bounded-context.png` (Martin Fowler: Sales Context e Support
Context, com Customer e Product aparecendo nos dois).

Kicker: `› DDD ESTRATÉGICO`

Frase: "**Bounded context**: o pedaço do sistema onde cada palavra tem um significado só.
Mesma palavra em outro pedaço pode ter outro significado, e tudo bem."

Linha de baixo: "Eric Evans cunhou em 2003. Martin Fowler resume: um modelo único pro
sistema inteiro não é viável quando o sistema cresce."

`ref: martinfowler.com/bliki/BoundedContext.html · imagem via fabriciorissetto.com/blog/ddd-bounded-context`

Notas: `[00:35–00:37]` apontar "Customer" e "Product" nos dois lados. "No quiz a palavra
que se repete é Resposta. Já já."

---

## S15: Subdomínios do quiz

**Visual:** 3 cards em colunas, o Núcleo em amarelo.

Kicker: `› ONDE GASTAR SPEC`

- `01 / [NÚCLEO]` **Diagnóstico da Turma.** As 3 perguntas que a turma mais errou, pra
  facilitadora voltar nelas. É o motivo de a PDA ter um quiz próprio em vez de usar o
  Kahoot. **Spec detalhada, com cenário pra cada regra.**
- `02 / [SUPORTE]` **Partida ao vivo e Banco de Perguntas.** Precisam existir e funcionar
  bem, mas o Kahoot já resolve parecido. **Spec das regras que mudam ponto e tempo.**
- `03 / [GENÉRICO]` **Login, PIN, QR code, hospedagem.** Todo sistema tem. **Usa
  biblioteca ou serviço pronto, spec de uma linha.**

`ref: fullcycle.com.br/domain-driven-design (subdomínios num streaming estilo Netflix)`

Notas: `[00:37–00:39]` pergunta pra turma: "No projeto de vocês, o que é núcleo? O que
faria alguém usar o seu e não o concorrente?" Ouvir 2 respostas.

---

## S16: Uma palavra, três significados

**Visual:** `img/gif-02-resposta-tres-sentidos.gif`.

Kicker: `› LINGUAGEM UBÍQUA`

Frase embaixo: "**Linguagem ubíqua**: o mesmo vocabulário no código, no teste, no prompt
e na conversa com quem pede a feature. Dentro de um contexto."

`ref: martinfowler.com/bliki/UbiquitousLanguage.html`

Notas: `[00:39–00:41]` "Se eu peço 'mostra as respostas da Partida', o agente entende
qual dos três? E se eu mudar o gabarito no Banco, as Respostas da Partida que já
aconteceram mudam?"

---

## S17: O glossário do quiz

**Visual:** 3 cards, um por contexto, com os termos em mono amarelo.

Kicker: `› GLOSSÁRIO`

- **Banco de Perguntas** `src/banco/`: `Quiz` (rascunho ou publicado), `Pergunta`,
  `Alternativa` (sempre 4), `Gabarito`. Não sabe de tempo, pontos nem Jogadora.
- **Partida ao vivo** `src/partida/`: `Sala`, `PIN`, `Jogadora` (apelido, não é aluna
  cadastrada), `Rodada`, `Cronômetro`, `Resposta` (alternativa + tempo `t`), `Placar`,
  `Pódio`.
- **Diagnóstico da Turma** `src/diagnostico/`: `Taxa de acerto`, `Pergunta crítica`. Só lê
  o resultado da Partida.

Notas: `[00:41–00:43]` "Jogadora e aluna são palavras diferentes de propósito: na
Partida ninguém faz login. Se um dia o Diagnóstico precisar saber quem é a aluna, essa
ligação é uma decisão de fronteira, e vai pra spec."

---

## S18: A fronteira no código: a Rodada congela a Pergunta

**Visual:** terminal com o código real do demo + o teste.

Kicker: `› FRONTEIRA DE VERDADE`

```js
// src/partida/rodada.js
export function iniciarRodada(pergunta, limite = 20) {
  return { pergunta: structuredClone(pergunta), limite, respostas: [] };
}

// tests/partida.test.js
test("a Rodada congela a Pergunta", () => {
  const rodada = iniciarRodada(p);
  p.gabarito = 3;
  assert.equal(rodada.pergunta.gabarito, 0);
});
```

Linha de baixo: "A Partida guarda uma **cópia** da Pergunta. Corrigir o gabarito no Banco
durante a aula não muda a Rodada que está rolando."

Notas: `[00:43–00:45]` este é o DDD que não fica vago: uma linha (`structuredClone`) e um
teste dizem onde um contexto termina. Perguntar: "E se a facilitadora quiser corrigir o
gabarito e recalcular os pontos? É regra de qual contexto?" (Resposta: Partida, e precisa
de spec própria.)

---

## S19: Mapa de contextos do quiz

**Visual:** diagrama com shapes. Três caixas na horizontal com setas amarelas e verbos;
uma quarta caixa cinza embaixo.

Kicker: `› CONTEXT MAP`

```text
[Banco de Perguntas] --publica Quiz--> [Partida ao vivo] --entrega Respostas--> [Diagnóstico da Turma]
                                   [Acesso: PIN, QR code]  (genérico, biblioteca)
```

Linha de baixo: "Cada seta é um contrato. Mudar o que atravessa a seta é mudar dois
contextos, e isso merece uma pergunta antes."

Notas: `[00:45–00:46]` é o mesmo formato do board de Excalidraw da aula 10: caixas,
seta com verbo.

---

## S20: Bounded context como cerca pro agente

**Visual:** `img/gif-03-agente-vazando.gif` (sem fronteira: edições vermelhas espalhadas
nas 3 pastas; com contexto: cerca amarela em `src/partida/`, edições verdes só ali).

Kicker: `› A CERCA`

Notas: `[00:46–00:48]` "A primeira metade é ilustração de repo sem fronteira. A segunda
aconteceu de verdade na preparação: com o glossário no contexto e 'mexa só em
`src/partida/`', o agente parou e me perguntou se podia mexer em `tests/`, que fica fora
da pasta. Isso a gente vê no S37."

---

## S21: Onde a cerca mora

**Visual:** terminal com `openspec/config.yaml` (conteúdo real do demo).

Kicker: `› ATÉ VOCÊ CONTAR PRA ELA`

```yaml
context: |
  Language: pt-BR
  Bounded contexts (um por pasta):
  - Banco de Perguntas (src/banco/): Quiz, Pergunta, Alternativa, Gabarito.
  - Partida ao vivo (src/partida/): Sala, PIN, Jogadora, Rodada, Cronômetro,
    Resposta, Placar, Pódio.
  - Diagnóstico da Turma (src/diagnostico/): Taxa de acerto, Pergunta crítica.
  Regras:
  - Uma change mexe em um bounded context só. Se precisar de outro, pare e pergunte.
  - Não crie Service, Manager, Factory, Provider, Helper ou Utils.
```

Linha de baixo: "O mesmo texto vai no `CLAUDE.md` (pro TLC e pra qualquer sessão). A
semana 3 continua valendo: o agente só sabe o que você escreveu."

Notas: `[00:48–00:50]` texto completo em `_facilitadora/contexto-glossario.txt`. "A
última regra é a vacina contra o Abstraction Bloat do S11." Transição pro lab.

---

## LAB 1 (0:50–1:05)

## S22: `LAB 1`

**Visual:** `labPanel` (metade amarela) + `_facilitadora/qa-gifs/gif-02-resposta-tres-sentidos-ultimo.png`
pequeno à direita.

`MÃO NA MASSA` · `LAB 1` · **Glossário e fronteira do seu projeto** · ⏱ 15 min ·
`GLOSSARIO.md`

Dica no rodapé: "Leia 5 minutos, escreva 10. O artigo é exemplo, o projeto é o seu."

Notas: `[00:50–00:51]` explicar a divisão dos artigos (S23).

---

## S23: Leia um (5 min)

**Visual:** 4 cards com miniatura. Imagens: `_facilitadora/img-ref/ref-treinaweb-event-storming.jpg` no card
3 e `_facilitadora/img-ref/ref-fowler-bounded-context.png` no card 2; cards 1 e 4 com o título do artigo em
destaque.

Kicker: `› LEITURA · ÚLTIMO DÍGITO DO SEU NÚMERO NA CHAMADA`

- `0–2 /` **Locadora de veículos: 16 histórias viram glossário e contextos.** Douglas
  Alonso, DDD na Prática parte 2. Leia "Linguagem ubíqua" e "Por que Financeiro não é um
  contexto só". `douglasalonso.medium.com/ddd-na-prática-parte-2-ee3cedd26125`
- `3–4 /` **"Produto" em Vendas e em Suporte.** Fabrício Rissetto, Bounded Context.
  Curto, 3 diagramas. `fabriciorissetto.com/blog/ddd-bounded-context`
- `5–7 /` **Post-its na parede: eventos, comandos e contextos.** TreinaWeb, O que é o
  Event Storming (a legenda das cores) e, se sobrar tempo, as fotos do workshop da
  Involves (`medium.com/involves-rocks/usando-ddd-e-event-storming-...`).
  `treinaweb.com.br/blog/o-que-e-o-event-storming`
- `8–9 /` **Núcleo, suporte e genérico num streaming.** Full Cycle, O que é DDD. Leia a
  parte de design estratégico. `fullcycle.com.br/domain-driven-design`

Notas: `[00:51–00:56]` cronometrar 5 minutos no telão. Links completos em
`REFERENCIAS.md`.

---

## S24: Escreva (10 min)

**Visual:** dois terminais lado a lado: o prompt à esquerda e o template à direita.

Kicker: `› COPIA E COLA`

Prompt (o agente levanta os substantivos; quem decide o significado é você):

```text
Não altere nenhum arquivo. Leia o código do projeto e liste os substantivos de domínio
que aparecem em nomes de pastas, arquivos, funções e variáveis. Para cada um, diga em
quais arquivos aparece. Não sugira nomes novos e não explique o que eles significam.
```

Template `GLOSSARIO.md`:

```markdown
# Glossário: <nome do projeto>

## Contexto 1: <nome> (pasta: src/<pasta>/)
- **<Termo>**: <o que significa AQUI, em uma frase>

## Contexto 2: <nome> (pasta: src/<pasta>/)
- **<Termo>**: <o que significa AQUI>

## Palavra que muda de sentido entre os dois
- **<Termo>**: no contexto 1 é ___; no contexto 2 é ___

## Núcleo do meu projeto
<o que faria alguém usar o meu e não o concorrente>
```

`yBar` **Pronto quando:** 2 contextos com pasta, 3 termos cada, e **uma** palavra que
muda de sentido entre eles.

Notas: `[00:56–01:05]` circular. Quem não acha palavra que muda de sentido: perguntar
"usuário" (quem compra × quem administra), "status", "item". Projeto sem pasta separada
ainda: escrever a pasta que **deveria** existir. Escolher 2 glossários pra mostrar no
fechamento.

---

## BLOCO 3: critério de aceite, BDD, OpenSpec e TLC (1:05–1:30)

## S25: Critério de aceite é a definição de pronto

**Visual:** `_facilitadora/img-ref/ref-wynne-example-mapping-mesa.png` (mesa com cartões: história
amarela, regras azuis, exemplos verdes, perguntas rosa).

Kicker: `› PRONTO É O QUE ESTÁ ESCRITO`

Frase: "**Critério de aceite**: a condição que precisa ser verdade pra feature contar como
pronta. Escrito antes do código, testável, na linguagem do glossário."

`ref: medium.com/@lilianborbadeoliveira (critérios de aceitação: checklist de regra ×
cenário)`

Notas: `[01:05–01:06]` voltar no S8: "O agente fez a feature 'pronta' segundo o critério
dele."

---

## S26: Example Mapping em 4 cores

**Visual:** 2 fotos: `_facilitadora/img-ref/ref-wynne-example-mapping-exemplo.jpg` (cartão verde com um
exemplo concreto) e `_facilitadora/img-ref/ref-wynne-example-mapping-pergunta.jpg` (cartão rosa com
pergunta).

Kicker: `› EXAMPLE MAPPING`

- **Amarelo**: a história.
- **Azul**: cada regra.
- **Verde**: exemplos concretos de cada regra ("a Jogadora respondeu certo aos 10 s").
- **Rosa**: o que ninguém sabe responder ainda. Pergunta rosa não vai pro agente
  decidir.

`ref: Matt Wynne, cucumber.io/blog/bdd/example-mapping-introduction`

Notas: `[01:06–01:07]` "É uma conversa de 25 minutos com post-it. Hoje vou fazer em
um GIF."

---

## S27: Example Mapping da pontuação

**Visual:** `img/gif-05-example-mapping-quiz.gif`.

Kicker: `› NO QUIZ`

Notas: `[01:07–01:09]` ler as 3 perguntas rosa e perguntar à turma qual delas o agente
do S8 respondeu sozinho (nenhuma explicitamente; ele decidiu o fora do tempo).

---

## S28: A regra em números

**Visual:** `img/gif-06-cronometro-pontos.gif`.

Kicker: `› EXEMPLOS VIRAM TESTE`

Linha de baixo: "`round(1000 - 500 * t / limite)` · 0 s = 1000 · 10 s = 750 · 20 s = 500 ·
20,3 s = recusada"

Notas: `[01:09–01:10]` "Cada número desse é um cenário. Cenário é teste antes de existir
teste."

---

## S29: Gherkin em português

**Visual:** terminal com o arquivo `.feature`.

Kicker: `› BDD · COPIA E COLA`

```gherkin
# language: pt
Funcionalidade: Pontuação por velocidade na Partida ao vivo

  Cenário: Resposta certa no primeiro segundo
    Dado uma Rodada com Cronômetro de 20 segundos
    Quando a Jogadora envia a Resposta certa aos 0 segundos
    Então a Partida soma 1000 pontos ao Placar dela

  Cenário: Resposta certa na metade do tempo
    Dado uma Rodada com Cronômetro de 20 segundos
    Quando a Jogadora envia a Resposta certa aos 10 segundos
    Então a Partida soma 750 pontos ao Placar dela

  Cenário: Resposta errada
    Dado uma Rodada com Cronômetro de 20 segundos
    Quando a Jogadora envia uma Resposta errada
    Então a Partida soma 0 pontos

  Cenário: Resposta depois do tempo
    Dado uma Rodada com Cronômetro de 20 segundos
    Quando a Resposta chega aos 20,3 segundos
    Então a Partida recusa a Resposta e soma 0 pontos
```

Linha de baixo: "**Dado** o estado · **Quando** a ação · **Então** o resultado que dá pra
conferir. Todo substantivo com inicial maiúscula está no glossário."

`ref: dgosantos89.github.io/Gherkin-p1 (Gherkin em português, com exemplo ruim e
corrigido)`

Notas: `[01:10–01:12]` BDD (Behavior-Driven Development: desenvolvimento guiado por
comportamento) aqui é só o formato. Não vamos instalar Cucumber. O texto é o mesmo que vai
no prompt do S36.

---

## S30: O agente procura buraco, você responde

**Visual:** terminal com o prompt.

Kicker: `› COPIA E COLA`

```text
Leia os cenários abaixo. Não escreva cenários novos e não escreva código.
Liste as perguntas que um dev faria antes de implementar: casos não cobertos, palavras
que podem ser lidas de dois jeitos, números que faltam.

<cole aqui seus cenários>
```

Linha de baixo: "As perguntas viram cartão rosa. Quem responde é quem conhece o negócio."

Notas: `[01:12–01:13]` este é o uso bom do agente na spec: achar buraco. O ruim é deixar
ele tapar.

---

## S31: O mesmo critério em três formatos

**Visual:** `img/gif-07-tres-formatos.gif` (Gherkin, OpenSpec e EARS, com condição e
resultado em amarelo).

Kicker: `› TRÊS DIALETOS`

Linha de baixo: "O OpenSpec escreve `SHALL` + `WHEN/THEN`. O TLC escreve EARS (Easy
Approach to Requirements Syntax: requisito em 5 moldes fixos). O Spec Kit usa
`Given/When/Then`. Quem sabe escrever o cenário à mão lê os três."

Notas: `[01:13–01:14]` EARS volta na semana 6. Hoje é só reconhecer.

---

## S32: Por que spec em arquivo funciona

**Visual:** diagrama com 4 caixas ligadas ao centro "spec", cada uma com a semana de
origem.

Kicker: `› CONTEXT ENGINEERING`

- **Glossário** → o nome igual no prompt, no código e no teste deixa o agente achar o
  arquivo certo com busca, sem ler o repo inteiro. (semana 2: mesa de trabalho)
- **Bounded context** → diz quais pastas entram na mesa. (semana 2)
- **Arquivo, não conversa** → a spec sobrevive ao `/clear` e à sessão de amanhã. (semana 3:
  até você contar pra ela)
- **Skill** → o OpenSpec e o TLC instalam skills em `.claude/skills/`; só carregam
  inteiras quando você chama. (semana 4: progressive disclosure)

Rodapé: "O TLC tem um teto escrito na skill: spec até ~5 mil tokens, contexto total
abaixo de 40 mil (20% da janela)."

`ref: .claude/skills/tlc-spec-driven/references/context-limits.md`

Notas: `[01:14–01:15]` é o slide do porquê. Se só um slide do bloco ficar na cabeça
deles, é este.

---

## S33: Três níveis de spec-driven

**Visual:** `_facilitadora/img-ref/ref-bockeler-sdd-niveis.png` (spec-first, spec-anchored, spec-as-source).

Kicker: `› UM POUCO DE CRÍTICA`

- **Spec-first**: escreve a spec, gera o código, a spec fica pra trás.
- **Spec-anchored**: a spec continua valendo depois da feature. O `archive` do OpenSpec
  junta a change em `openspec/specs/`.
- **Spec-as-source**: humano só edita spec. A Böckeler lembra que model-driven development
  tentou isso e não pegou.

Linha de baixo: "Custo: markdown demais pra revisar. A Böckeler usou o spec-kit numa
feature pequena e comparou com 'usar uma marreta pra quebrar uma noz'."

`ref: Birgitta Böckeler, martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html`

Notas: `[01:15–01:16]` cortável. O ponto: ferramenta pesada pra mudança pequena é custo.
O TLC tenta resolver isso pulando fases (S40).

---

## S34: Demo 2: instalar o OpenSpec

**Visual:** terminal com comandos e saída real.

Kicker: `› DEMO 2 · OPENSPEC · COPIA E COLA`

```bash
npm install -g @fission-ai/openspec@latest
cd demo-quiz-pda
openspec init --tools claude --language pt-BR
```

```text
√ Setup complete for Claude Code
6 skills and 6 commands in .claude/
Config: openspec/config.yaml (schema: spec-driven)
Getting started:
  Start your first change: /opsx:propose "your idea"
```

Linha de baixo: "Node 20.19 ou mais novo. Funciona com Claude Code, Cursor, Copilot, Codex e outros:
troque `claude` em `--tools`. Opt-out de telemetria: `OPENSPEC_TELEMETRY=0`."

`ref: github.com/Fission-AI/OpenSpec · saída real, OpenSpec 1.14.0`

Notas: `[01:16–01:17]` `--language pt-BR` faz os artefatos saírem em português e mantém
`SHALL` e os títulos em inglês. Se o npm travar na rede da sala, trocar pra cópia já
instalada.

---

## S35: O glossário entra na mesa do agente

**Visual:** terminal com o comando e a saída real (o bloco `<project_context>` que o
OpenSpec monta pro agente).

Kicker: `› CONTEXT ENGINEERING NA PRÁTICA`

```bash
code openspec/config.yaml     # ou qualquer editor
# cole o glossário embaixo de "context: |", com 2 espaços de recuo
openspec new change placar-mais-legal
mkdir -p openspec/changes/placar-mais-legal/specs/partida
printf '## ADDED Requirements\n\n### Requirement: Placar melhor\nO placar deve ficar mais legal e mais rápido.\n' \
  > openspec/changes/placar-mais-legal/specs/partida/spec.md
openspec instructions proposal --change placar-mais-legal | head -30
```

```text
<project_context>
<!-- This is background information for you. Do NOT include this in your output. -->
Language: pt-BR
...
Bounded contexts (um por pasta):
- Banco de Perguntas (src/banco/): Quiz, Pergunta, Alternativa, Gabarito. ...
- Partida ao vivo (src/partida/): Sala, PIN, Jogadora, Rodada, Cronômetro, ...
...
- Uma change mexe em um bounded context só. Se precisar de outro, pare e pergunte.
</project_context>
```

Linha de baixo: "É isso que o agente recebe antes de escrever cada artefato. Vocês estão
vendo a mesa por dentro."

Notas: `[01:17–01:18]` colar o conteúdo de `_facilitadora/contexto-glossario.txt`. As
3 linhas do meio criam uma change vaga de propósito ("vou precisar dela daqui a pouco"), que
volta no S38. O `instructions` precisa de uma change existente pra mostrar o contexto.
Saída real, OpenSpec 1.14.0.

---

## S36: O prompt do `/opsx:propose`

**Visual:** terminal com o prompt inteiro.

Kicker: `› COPIA E COLA · NO CLAUDE CODE`

```text
/opsx:propose pontuacao-por-velocidade

Na Partida ao vivo, uma Resposta certa vale entre 500 e 1000 pontos, conforme a
velocidade: round(1000 - 500 * t / limite). Resposta errada vale 0. Resposta que chega
depois do fim do Cronômetro é recusada.

Use estes cenários como critério de aceite. Não invente cenário novo sem me perguntar:

<cole os 4 cenários do S29>

Mexa só em src/partida/. Banco de Perguntas e Diagnóstico da Turma ficam fora do escopo.
```

Linha de baixo: "Regra em uma frase + cenários + cerca. Três partes."

Notas: `[01:18–01:19]` o prompt inteiro (com os cenários já colados) está em
`_facilitadora/p2-openspec.txt`. Leva de 1 a 3 minutos. Enquanto roda, ir pro S37 com o
plano B aberto e comparar quando terminar.

---

## S37: O que voltou: 4 arquivos e uma pergunta

**Visual:** terminal com a árvore criada e trechos reais da resposta do agente.

Kicker: `› SAÍDA REAL`

```text
openspec/changes/pontuacao-por-velocidade/
|-- proposal.md      # por que e escopo: só Partida ao vivo
|-- specs/pontuacao-por-velocidade/spec.md   # 3 requisitos, 4 cenários
|-- design.md        # a regra fica em registrarResposta, sem módulo novo
`-- tasks.md         # 3 tarefas, cada uma com verificação
```

```text
Decisões minhas que valem conferir:
- t == limite: conta como dentro do tempo e vale 500. Só t > limite é recusada.
- Resposta recusada: não entra em rodada.respostas. Assim o Diagnóstico
  da Turma continua funcionando sem ser alterado.
O que preciso de você: você pediu para mexer só em src/partida/, mas os
testes ficam em tests/partida.test.js, fora dessa pasta.
```

Linha de baixo: "Compara com o S8: lá ele decidiu e não contou. Aqui ele decidiu pouco,
contou o que decidiu e perguntou sobre a cerca."

Notas: `[01:19–01:21]` **ponto de julgamento**: decidir com a turma se `t == limite`
conta (votação rápida), e liberar `tests/`. Plano B:
`_facilitadora/plano-b/openspec/saida-propose.txt`.

---

## S38: Quebra de propósito: spec vaga não passa

**Visual:** `img/gif-10-openspec-validate.gif` (saída real: a change vaga leva ERROR, a da
pontuação passa).

Kicker: `› PRONTO É O QUE ESTÁ ESCRITO`

A change vaga foi criada no S35. Ao vivo:

```bash
openspec validate placar-mais-legal
openspec validate pontuacao-por-velocidade
```

Notas: `[01:21–01:22]` "Ele reclama de duas coisas: falta `SHALL` e falta cenário. Sem
cenário não tem como saber se está pronto. A ferramenta só checa a forma; se a regra está
certa, quem checa é você."

---

## S39: apply e archive

**Visual:** `img/gif-08-openspec-fluxo.gif` à esquerda (fluxo inteiro, saída real) e
`_facilitadora/img-ref/ref-openspec-dashboard.png` à direita (o `openspec view`).

Kicker: `› COPIA E COLA`

```text
/opsx:apply pontuacao-por-velocidade
```

```bash
npm test
openspec archive pontuacao-por-velocidade -y
```

Linha de baixo: "Depois do archive, a spec vai pra `openspec/specs/` e passa a ser a
referência da Partida. A próxima change é um delta em cima dela."

`ref: saída real: 3/3 tasks, 8 testes passando · imagem: github.com/Fission-AI/OpenSpec`

Notas: `[01:22–01:24]` na preparação, o `/opsx:archive` dentro do Claude Code parou e
perguntou se sincronizava a spec principal. O comando de terminal com `-y` faz direto.
Mostrar `openspec/specs/pontuacao-por-velocidade/spec.md` depois.

---

## S40: Demo 3: TLC spec-driven

**Visual:** `img/gif-09-tlc-fases.gif` (SPECIFY, DESIGN, TASKS, EXECUTE, VERIFY; mudança
pequena pula fases; verificador com contexto limpo).

Kicker: `› DEMO 3 · TLC · COPIA E COLA`

```bash
npx @tech-leads-club/agent-skills install -s tlc-spec-driven -a claude-code
```

```text
Use a skill tlc-spec-driven para especificar a feature "Pódio no fim da Partida":
quando a última Rodada termina, a Partida mostra as 3 Jogadoras com mais pontos.

Escreva os critérios de aceite em EARS, usando os termos do glossário do CLAUDE.md.
Se encontrar um caso que a descrição não resolve, registre como pergunta em vez de
decidir sozinha.

Pare depois da fase SPECIFY e me mostre o spec.md antes de seguir.
```

Linha de baixo: "Uma skill só. Ela decide o tamanho: mudança pequena pula Design e Tasks.
Precisa de Python 3 pros scripts de validação."

`ref: agent-skills.techleads.club/tlc-spec-driven · autor: Felipe Rodrigues (Tech Leads
Club)`

Notas: `[01:24–01:26]` o glossário precisa estar no `CLAUDE.md` (colar o mesmo texto do
S21). Pódio é de propósito uma feature com cara de simples. Prompt em
`_facilitadora/p3-tlc.txt`.

---

## S41: O que o TLC devolveu

**Visual:** `img/gif-13-tlc-perguntas-podio.gif` (5 critérios EARS à esquerda, 7 perguntas
rosa à direita, saída real).

Kicker: `› SAÍDA REAL`

```bash
python3 .claude/skills/tlc-spec-driven/scripts/validate_spec.py \
  .specs/features/podio-fim-da-partida
```

Linha de baixo: "Empate, menos de 3 Jogadoras, quem entrou atrasada. O TLC não decidiu
nenhuma: escreveu como pergunta. São os cartões rosa do Example Mapping, feitos pelo
agente."

Notas: `[01:26–01:30]` ler Q3 (empate) e votar com a turma. "Pódio parecia uma linha.
Tem sete perguntas." Se perguntarem qual ferramenta usar: OpenSpec quando você já sabe a
regra e quer um ciclo curto (propose, apply, archive); TLC quando a feature ainda tem
pergunta aberta ou é grande, porque ele escala as fases e verifica com outro agente.
Plano B: `_facilitadora/plano-b/tlc/`.

---

## LAB 2 (1:30–1:55)

## S42: `LAB 2`

**Visual:** `labPanel` + `_facilitadora/qa-gifs/gif-07-tres-formatos-ultimo.png` à direita.

`MÃO NA MASSA` · `LAB 2` · **Sua primeira spec** · ⏱ 25 min · `OpenSpec ou TLC`

Dica no rodapé: "Número par na chamada: OpenSpec. Ímpar: TLC. Na aula 10 vocês trocam."

Notas: `[01:30–01:31]` sorteio por paridade divide a sala e garante que a aula 10 tenha
os dois lados pra comparar.

---

## S43: Passo a passo

**Visual:** `steps` numerados + dois terminais pequenos (OpenSpec / TLC).

Kicker: `› 25 MINUTOS`

1. **Escolha uma feature pequena do seu projeto** que mexe em um contexto só do seu
   `GLOSSARIO.md`. (2 min)
2. **Escreva 3 cenários à mão**, em Gherkin, sem abrir o agente. Use os termos do
   glossário. (8 min)
3. **Instale e configure** (5 min):

```bash
# par: OpenSpec
npm install -g @fission-ai/openspec@latest
openspec init --tools claude --language pt-BR
# cole o GLOSSARIO.md em openspec/config.yaml, embaixo de "context: |"
```

```bash
# ímpar: TLC
npx @tech-leads-club/agent-skills install -s tlc-spec-driven -a claude-code
# cole o GLOSSARIO.md no fim do CLAUDE.md
```

4. **Rode o prompt do S44.** (5 min)
5. **Valide e compare** (5 min): o que o agente acrescentou, o que mudou, que pergunta
   ele fez.

Notas: `[01:31–01:32]` Windows: OpenSpec roda igual. TLC precisa de `python` ou `py` no
PATH; sem Python, o agente faz a checagem lendo a spec (a skill prevê isso), e o aluno
anota que não rodou o script.

---

## S44: Os prompts do lab

**Visual:** dois terminais com os prompts.

Kicker: `› COPIA E COLA`

OpenSpec:

```text
/opsx:propose <nome-da-feature-em-kebab-case>

<a regra em uma frase, com números>

Use estes cenários como critério de aceite. Não invente cenário novo sem me perguntar:

<seus 3 cenários>

Mexa só em src/<pasta-do-contexto>/. <outros contextos> ficam fora do escopo.
```

TLC:

```text
Use a skill tlc-spec-driven para especificar a feature "<nome>": <a regra em uma frase>.

Escreva os critérios de aceite em EARS, usando os termos do glossário do CLAUDE.md.
Parta destes cenários e não invente outros sem perguntar:

<seus 3 cenários>

Se encontrar um caso que a descrição não resolve, registre como pergunta em vez de
decidir sozinha. Pare depois da fase SPECIFY e me mostre o spec.md antes de seguir.
```

Notas: `[01:32–01:50]` circular. Erro comum 1: feature que mexe em dois contextos
(dividir em duas). Erro comum 2: cenário sem número ("rápido", "melhor"). Erro comum 3:
aceitar a primeira spec sem ler. Anotar 2 specs pra mostrar no fechamento.

---

## S45: Pronto quando

**Visual:** `img/gif-11-tlc-validate.gif` (saída real: critério sem SHALL leva ERROR,
critério EARS passa).

Kicker: `› GATE`

```bash
openspec validate <nome-da-change>      # par
python3 .claude/skills/tlc-spec-driven/scripts/validate_spec.py .specs/features/<feature>   # ímpar
```

`yBar` **Pronto quando:** o validador sai sem erro **e** você tem um arquivo
`DIFERENCAS.md` com 3 linhas: uma coisa que o agente acrescentou, uma que ele mudou nos
seus cenários, uma pergunta que ele fez (ou "não fez pergunta nenhuma", que também é
achado).

Notas: `[01:50–01:55]` armadilha conhecida do script do TLC: os critérios precisam vir na
linha logo abaixo de `**Acceptance Criteria**:`, sem linha em branco no meio, senão ele
não lê. O validador confere forma; o `DIFERENCAS.md` é a parte que só o aluno escreve.

---

## FECHAMENTO (1:55–2:00)

## S46: Recap: pergunta antes de mostrar

**Visual:** 3 cards que viram (pergunta em cima, resposta revelada no clique).

Kicker: `› RECAP`

- `01 /` "O que o agente fez com a Resposta atrasada no pedido vago?" → Deu 500 pontos e
  escreveu teste garantindo.
- `02 /` "Onde mora a cerca que segura o agente numa pasta?" → No glossário e no contexto
  (`config.yaml`, `CLAUDE.md`) e no prompt.
- `03 /` "Que pergunta o TLC fez que você não tinha pensado?" → (deles)

Notas: `[01:55–01:57]` mostrar os 2 glossários e as 2 specs anotados durante os labs.

---

## S47: `</DEMO DAY>` aula 10

**Visual:** `_facilitadora/img-ref/ref-treinaweb-event-storming.jpg` (fluxo de post-its coloridos).

Kicker: `› AULA 10 · EXCALIDRAW COLETIVO`

- **Formato:** trios com domínios diferentes, o board `board-bounded-contexts.excalidraw`.
- **Rodada 1:** cada um desenha seus contextos e a seta com verbo. Os outros dois
  perguntam "isso é fronteira de domínio ou de técnica?".
- **Rodada 2:** troca de spec. Quem fez OpenSpec lê uma spec do TLC e vice-versa. A missão:
  achar uma frase do cenário do colega que dá pra ler de dois jeitos.
- **Traga pronto:** `GLOSSARIO.md` + a change validada do LAB 2.
- **Trios:** sorteio com prioridade a domínios diferentes (o mesmo da semana 3).

Notas: `[01:57–01:58]` a rodada 2 é nova em relação ao roteiro antigo da aula 10. Ajustar
o `ROTEIRO-FACILITADORA.md`.

---

## S48: Entregável + regra da casa

**Visual:** `_facilitadora/qa-gifs/gif-03-agente-vazando-ultimo.png` (a cerca na Partida) pequeno à direita.

Kicker: `› ENTREGÁVEL · ANTES DA AULA 1 DA SEMANA 6`

- **Mínima:** `GLOSSARIO.md` + uma change validada (OpenSpec ou TLC) commitada no seu repo.
- **Completa:** a mesma feature especificada também na outra ferramenta, e um parágrafo
  comparando: qual perguntou mais, qual inventou mais, qual você usaria no seu projeto e
  por quê.
- Formulário: `forms.gle/PSd6i65g44GwBMgq6`

`infoBox` "Você é responsável por cada linha que commita. Inclusive as linhas da spec."

Notas: `[01:58–01:59]` o `ENTREGAVEL.md` atual fala do `RELATORIO-FRONTEIRA.md`; precisa
ser atualizado pra esta versão.

---

## S49: Referências

**Visual:** grade de miniaturas: `ref-fowler-bounded-context.png`,
`ref-wynne-example-mapping-mesa.png`, `ref-bockeler-sdd-niveis.png`,
`ref-openspec-dashboard.png`.

Kicker: `› PRA LER DEPOIS`

- Martin Fowler, Bounded Context e Ubiquitous Language (martinfowler.com/bliki)
- Douglas Alonso, DDD na Prática parte 2 (locadora de veículos)
- Fabrício Rissetto, DDD: Bounded Context
- TreinaWeb, O que é o Event Storming · Involves, DDD e Event Storming num módulo legado
- Full Cycle, O que é DDD
- Lílian Borba, Critérios de aceitação para histórias de usuário
- Diego Santos, Usando todo o poder do Gherkin (partes 1 e 2)
- Matt Wynne, Introducing Example Mapping (Cucumber)
- Birgitta Böckeler, Understanding Spec-Driven Development: Kiro, spec-kit and Tessl
- OpenSpec: github.com/Fission-AI/OpenSpec
- TLC spec-driven: agent-skills.techleads.club/tlc-spec-driven
- GitClear, The Maintainability Gap 2026

Notas: `[01:59–02:00]` lista completa com URL em `REFERENCIAS.md`.

---

## Imagens deste deck

| Arquivo | Slide | Origem |
|---|---|---|
| `img/gif-01-abstraction-bloat.gif` | S11 | gerado, ilustração |
| `img/gif-02-resposta-tres-sentidos.gif` | S16, S22 | gerado |
| `img/gif-03-agente-vazando.gif` | S20, S48 | gerado; metade ilustração, metade baseada na saída real |
| `img/gif-04-mesa-de-trabalho.gif` | S13 | gerado, ilustração de proporção |
| `img/gif-05-example-mapping-quiz.gif` | S27 | gerado |
| `img/gif-06-cronometro-pontos.gif` | S1, S28 | gerado, valores pela fórmula |
| `img/gif-07-tres-formatos.gif` | S31, S42 | gerado |
| `img/gif-08-openspec-fluxo.gif` | S39 | gerado a partir de saída real |
| `img/gif-09-tlc-fases.gif` | S40 | gerado, fases conforme o SKILL.md do TLC 3.3.0 |
| `img/gif-10-openspec-validate.gif` | S38 | gerado a partir de saída real |
| `img/gif-11-tlc-validate.gif` | S45 | gerado a partir de saída real |
| `img/gif-12-pedido-vago-real.gif` | S8 | gerado a partir do diff real |
| `img/gif-13-tlc-perguntas-podio.gif` | S41 | gerado a partir de saída real |
| `_facilitadora/img-ref/ref-bockeler-sdd-visao-geral.png` | S3 | Birgitta Böckeler, martinfowler.com |
| `_facilitadora/img-ref/ref-bockeler-sdd-niveis.png` | S33, S49 | Birgitta Böckeler, martinfowler.com |
| `_facilitadora/img-ref/ref-fowler-bounded-context.png` | S14, S23, S49 | Martin Fowler (cópia publicada por Fabrício Rissetto) |
| `_facilitadora/img-ref/ref-wynne-example-mapping-cartoes.jpg` | S5 | Matt Wynne, cucumber.io |
| `_facilitadora/img-ref/ref-wynne-example-mapping-mesa.png` | S25, S49 | Matt Wynne, cucumber.io |
| `_facilitadora/img-ref/ref-wynne-example-mapping-exemplo.jpg` | S26 | Matt Wynne, cucumber.io |
| `_facilitadora/img-ref/ref-wynne-example-mapping-pergunta.jpg` | S26 | Matt Wynne, cucumber.io |
| `_facilitadora/img-ref/ref-openspec-dashboard.png` | S39, S49 | README do OpenSpec (MIT) |
| `_facilitadora/img-ref/ref-treinaweb-event-storming.jpg` | S23, S47 | TreinaWeb |

Imagens de terceiros com crédito na linha `ref:` do slide. Uso em aula, sem
redistribuição comercial.

## Teto visual

Nenhuma sequência de mais de 2 slides sem GIF, imagem, terminal, diagrama ou grade de
cards. Todos os 49 slides têm uma linha **Visual:** com recurso definido.
