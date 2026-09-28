# SLIDES-OUTLINE: Semana 4 (Aula 7): Skills, Tools e MCP

Arquivo: `P [M2] - S4 - Skills, Tools e MCP.pptx` · **42 slides** · template PDA
(fundo `2A042E`, amarelo `EDDC11`, Dela Gothic One / IBM Plex Sans / IBM Plex Mono,
estrelas extraídas do deck do Módulo 1). Substitui o outline anterior desta pasta, que
estava desatualizado.

Aula 8 não tem deck: é lab guiado paralelo, com a cena `excalidraw/aula8-lab-guiado.excalidraw`.

**Fio condutor:** *"Skill ensina. Tool faz."* S2 planta, S17 troca de bloco, S26 e S38 fecham.

## Rastreio dos objetivos

| objetivo | slides dedicados | apoio |
|---|---|---|
| 1 · Skill (conhecimento) vs MCP/Tool (capacidade) | **S26** | S27 (votação), S17, S38 |
| 2 · Quando conectar um MCP vale a pena | **S31** | S29, S30 (custo medido) |
| 3 · Riscos do OWASP Top 10 para LLM em cenário prático | **S32, S33, S34** | S7 (Giro), aula 8 (3 riscos ao vivo) |
| 4 · Taxonomia do MCP (hosts, clients, servers, prompts, resources, tools) | **S23, S24** | S25 (o log real) |
| 5 · Skill com progressive disclosure + validar a de outra pessoa | **S10, S15** | S9, S11, S12, S13 (demo), S14 |

Tópicos pedidos no brief: o que é uma tool na prática (S18–S21) · taxonomia (S23–S25) ·
skill vs MCP/tool (S26–S27) · custo escondido de contexto (S29–S30).

Teto de 3 slides seguidos sem recurso visual: respeitado. Contam terminal, cards, tabela,
gráfico, diagrama, GIF e slot; a estrela não conta. Os únicos slides só de texto são S2 e
S17 (fio condutor), nunca vizinhos.

Estilo: nenhuma frase-fórmula em caixa alta com conclusão categórica, nenhum travessão de
efeito, humor no aprendizado (o dado que o modelo "rola", o convite de agenda), termos
técnicos traduzidos na primeira vez (progressive disclosure, tool call, host/client/server,
prompt injection, excessive agency, supply chain).

## GIFs e imagens

| slide | recurso | observação |
|---|---|---|
| S11 | GIF: a janela de contexto enchendo em 5 quadros (níveis 1, 2, 3) | gerado, anima no PowerPoint |
| S18 | GIF: o loop da tool call (modelo, harness, resultado, modelo) | gerado |
| S20 | GIF: d20 rolando até `rolar_dado -> 11` | gerado |
| S6, S29 | gráficos nativos (preço por token; tokens de definição de tool) | editáveis no PowerPoint |
| S7, S9, S22, S23, S31, S34 | diagramas em shapes (fluxo, N x M, host/client/server, decisão, tríade) | editáveis |

## Slots a preencher (nenhuma imagem inventada)

| slide | o que vai ali |
|---|---|
| S13 | print do transcript sem a leitura do `reference.md` + perfil com a cidade inventada |
| S28 | print do Google Calendar com o evento "Aula 8 PDA" + o pedido de permissão |
| S30 | GIF ou 2 prints do `/context` com `ENABLE_TOOL_SEARCH=false` e com o padrão |

---

## Mapa dos slides

### Abertura e Giro das IAs (0–10)

| # | slide | componente |
|---|---|---|
| S1 | Capa: `</MÓDULO 2 · AULA 7>` SKILLS, TOOLS E MCP | painel amarelo + estrela |
| S2 | Fio condutor: **Skill ensina. Tool faz.** | frase isolada |
| S3 | `</HOJE>` agenda com horários | tabela + barra "você sai daqui com" |
| S4 | Giro: as 3 notícias | 3 cards + infoBox |
| S5 | Giro 1 · Opus 5.5 virou padrão no plano Pro (22/09) | infoBox + steps + terminal |
| S6 | Giro 2 · GPT-6 Sol e Luna no Codex (22/09) | infoBox + gráfico de preço |
| S7 | Giro 3 · agente do Gemini invadiu 3 empresas reais num teste (19/09) | fluxo em 4 caixas + steps |

### Recap e skills, de novo (10–45)

| # | slide | componente |
|---|---|---|
| S8 | Recap do red team: 3 perguntas sorteadas | 3 cards |
| S9 | O fluxo de uma skill em 5 passos | diagrama + infoBox |
| S10 | **Objetivo 5** · os 3 níveis de progressive disclosure com números | 3 cards |
| S11 | A janela de contexto enchendo | **GIF** |
| S12 | O ponteiro: o SKILL.md precisa dizer quando abrir o reference.md | 2 terminais + steps |
| S13 | ⚠ Demo: a skill que não abre o manual (quebra de propósito) | steps + **slot** |
| S14 | Correção: `allowed-tools` libera, não restringe | 2 cards + terminal |
| S15 | **Objetivo 5** · quatro testes pra validar a skill de outra pessoa | 4 cards |
| S16 | **LAB 1 · KAHOOT** (15 min) | labPanel + 5 passos |

### Tools e MCP (60–90)

| # | slide | componente |
|---|---|---|
| S17 | Fio condutor de novo: troca de bloco | frase |
| S18 | O loop da tool call | **GIF** |
| S19 | Você já usa tools: o transcript do Claude Code | terminal + grade de tools |
| S20 | Por que um dado precisa de tool | 2 terminais + **GIF** |
| S21 | Anatomia de uma tool: 3 partes o modelo lê, a 4ª só roda | código + steps |
| S22 | MCP em uma frase: N x M vira N + M | diagrama |
| S23 | **Objetivo 4** · host, client, server | diagrama + definições |
| S24 | **Objetivo 4** · tools, resources, prompts: quem decide usar | 3 cards |
| S25 | A taxonomia no cano: o log real do Claude Code 2.1.283 | terminal + steps |
| S26 | **Objetivo 1** · Skill é conhecimento. MCP é capacidade. | 2 cards + citação |
| S27 | Vota: skill, MCP ou os dois? (6 situações) | grade de cards |
| S28 | ⚠ Demo: Google Calendar no Claude Code, com convite plantado | steps + **slot** |
| S29 | O custo escondido: tokens de definição de tool | gráfico + steps + infoBox |
| S30 | Mede antes de opinar: `/context` com e sem tool search | terminal + **slot** |
| S31 | **Objetivo 2** · cinco perguntas antes do `claude mcp add` | diagrama de decisão |
| S32 | **Objetivo 3** · OWASP Top 10 para LLM 2026 | grade 2 x 5 |
| S33 | **Objetivo 3** · cenário: o convite de agenda que dá ordem | card do convite + infoBox |
| S34 | **Objetivo 3** · três riscos da lista e a tríade letal | steps + diagrama |

### LAB 2 e fechamento (90–120)

| # | slide | componente |
|---|---|---|
| S35 | ⚠ Failed to connect: o erro que eles vão ver (quebra de propósito) | terminal com saída real + steps |
| S36 | **LAB 2 · ESQUELETO DO SEU MCP SERVER** (25 min) | labPanel + 6 passos |
| S37 | Leia o `conversa.log`: 3 perguntas que o agente não responde por você | steps + terminal |
| S38 | O que fica (pergunto antes de mostrar) | 6 cards |
| S39 | Entregável: mínima e completa | 2 cards |
| S40 | `</DEMO DAY>` aula 8: lab guiado paralelo + 3 riscos ao vivo | steps + card |
| S41 | Links (10) | lista numerada |
| S42 | Dúvidas e suporte + regra da casa | painel amarelo |

---

## Decisões de construção

- **Sem Alura nos slides.** O curso assíncrono vive no `ENTREGAVEL.md` e no roteiro.
- **Nenhum lab exige API key.** Tudo roda com a conta Claude (semana ≤ 10).
- **O log do S25 e a saída do S35 são reais**, capturados com o Claude Code 2.1.283 contra
  o starter desta pasta.
- **Os números pequenos do S29 (150 e 370 tokens)** foram medidos no tokenizer o200k,
  aproximados; os grandes são do post da Anthropic.
