# Referências verificadas — Semana 5: Engenharia de software para desenvolvimento com IA

Todas abertas com WebFetch nesta sessão (13/09/2026). Nenhum link foi composto por
analogia. Mínimo exigido: 8. Entregues: 11.

| # | URL | O que é | Status | Onde entra |
|---|---|---|---|---|
| 1 | <https://www.gitclear.com/ai_assistant_code_quality_2025_research> | GitClear, "AI Copilot Code Quality: 2025 Data Suggests 4x Growth in Code Clones" — 211 milhões de linhas analisadas (2020–2024, Google/Microsoft/Meta/C-Corps). Duplicação "copy/pasted" de 8,3% (2020) pra 12,3% (2024); refatoração caiu de 25% das linhas alteradas (2021) pra <10% (2024) | ✅ Verificado — dados quantitativos lidos por completo | Métrica-base da Categoria 2 do checklist (`starter/checklist-sinais-codigo-ia.md`); slide 6; PACOTE.md |
| 2 | <https://www.gitclear.com/the_ai_code_quality_maintainability_gap> | GitClear, "The Maintainability Gap: 2026 AI Code Quality Research" — 623 milhões de mudanças (2023–2026). Duplicação de blocos +81%, construtos que mascaram erro +47%, churn de 2 semanas +15%, chamadas de função entre arquivos -35%, refatoração -70%. Proporção duplicação:refatoração passou de 1:2 (2022) pra 5:1 (hoje) | ✅ Verificado — relatório completo, números conferidos | Dado central de "Abstraction Bloat" (checklist Categorias 2 e 3); slide 6-7; PACOTE.md (seção de literatura) |
| 3 | <https://arxiv.org/html/2605.02741v1> | Paper acadêmico "AI-Generated Smells: An Analysis of Code and Architecture in LLM- and Agent-Driven Development" — ~450 soluções (5 LLMs × CodeContest) + repositórios multi-agente (MetaGPT). Nomeia "God Class Syndrome", "Modular Mirage", "Reasoning-Complexity Paradox" (correlação ρ=0,94 entre linhas de código e smells arquiteturais) | ✅ Verificado — metodologia e taxonomia lidas por completo | Nomes usados literalmente no checklist (1.1 God Class, 1.2 Modular Mirage, justificativa da 1.5 Reasoning-Complexity Paradox); slide 7 |
| 4 | <https://www.thoughtworks.com/en-us/radar/techniques/complacency-with-ai-generated-code> | Thoughtworks Technology Radar — entrada nomeada "Complacency with AI-generated code": cita o próprio dado da GitClear, cita pesquisa da Microsoft sobre confiança gerada por IA "at the expense of critical thinking", nomeia "vibe coding" como sintoma, recomenda TDD/análise estática/instruções curadas de equipe | ✅ Verificado — texto completo | Ancora o tema num consenso de mercado (não é só uma leitura isolada); slide 5; PACOTE.md (honestidade sobre força da evidência) |
| 5 | <https://martinfowler.com/bliki/BoundedContext.html> | Martin Fowler, bliki "Bounded Context" — definição canônica: unificação total do modelo de domínio não é viável em sistema grande; cada contexto tem seu próprio modelo consistente. Exemplo clássico: "meter" significando coisas diferentes em departamentos diferentes de uma companhia elétrica | ✅ Verificado — texto completo | Base do vocabulário de DDD estratégico; slide 9-10; ENTREGAVEL.md; excalidraw |
| 6 | <https://martinfowler.com/bliki/UbiquitousLanguage.html> | Martin Fowler, bliki "Ubiquitous Language" — termo cunhado por Eric Evans: linguagem rigorosa e comum entre devs e especialistas de domínio, construída em cima do modelo, que evolui junto com o entendimento da equipe | ✅ Verificado — texto completo | Base do vocabulário de DDD estratégico; conecta diretamente com o sinal 1.4 do checklist (nomeação genérica); slide 9 |
| 7 | <https://www.alura.com.br/curso-online-ddd-fundamentos-design-orientado-dominio> | Curso Alura "DDD: fundamentos do design orientado a domínio" (20h, 72 atividades, com Vinícius Albano) — cobre tanto estratégico ("do domínio ao contexto", Event Storming, Domain Storytelling) quanto tático (entidades, agregados, eventos de domínio) | ✅ Verificado — ementa confirmada, cobertura estratégica × tática distinguida | Mapeamento Alura (PACOTE.md) — só os módulos estratégicos entram no pré-requisito; o tático é citado como "existe, não é isso que resolve hoje" |
| 8 | <https://www.alura.com.br/curso-online-qualidade-codigo-code-review> | Curso Alura "Qualidade de código: estratégia de Code Review, métricas e governança" (12h, Daniel Loureiro Cintra) — módulos: fundamentos de qualidade, refatoração manual, code review profissional, SonarCloud, "Inteligência Artificial no fluxo", governança | ✅ Verificado — ementa e módulos confirmados | Mapeamento Alura (PACOTE.md) — sustenta o vocabulário geral de code smell/duplicação/complexidade que o síncrono não reexplica do zero |
| 9 | <https://code.claude.com/docs/en/memory> | Doc oficial do Claude Code — seção "Organize rules with `.claude/rules/`" e "Path-specific rules": frontmatter `paths` com glob patterns escopa uma regra a diretórios/tipos de arquivo específicos, carregada só quando Claude lê um arquivo que casa com o padrão | ✅ Verificado — página completa lida, sintaxe exata conferida | Ponte prática entre bounded context e `.claude/rules/`, citada na aula 1 (teoria) e no bônus do board Excalidraw |
| 10 | <https://docs.excalidraw.com/docs/codebase/json-schema> | Documentação oficial do Excalidraw — schema JSON: campos top-level (`type`, `version`, `source`, `elements`, `appState`, `files`) e campos de elemento | ✅ Verificado | Base de construção de `excalidraw/board-bounded-contexts.excalidraw` (combinado com `_EXCALIDRAW.md`, que é mais específico e prevaleceu nos detalhes de sintaxe) |
| 11 | <https://dora.dev/dora-report-2025/> | Relatório DORA 2025 (Google Cloud/DX) — conclusão central: "AI's primary role is as an amplifier, magnifying an organization's existing strengths and weaknesses" | ✅ Verificado — mas **fraco pro que este pacote precisa**: não traz métrica quantitativa específica de qualidade de código/abstração gerada por IA, só a moldura geral de "amplificador". Citado com essa ressalva explícita, não como dado duro | Uma frase em PACOTE.md, na seção "o que a literatura NÃO tem" |

## O que eu procurei e decidi não usar

- **Um número único e citável pra "Abstraction Bloat" como métrica formalizada** não existe
  publicado — nem GitClear, nem o paper do arXiv, nem o Radar do Thoughtworks propõem uma
  métrica com esse nome. O nome "Abstraction Bloat" é cunhado por este curso; os dados
  citados (#1, #2, #3) são os sinais mais próximos, indiretos, que sustentam por que o
  padrão existe — não uma prova de que "Abstraction Bloat" é medido em X%. Isso está
  registrado explicitamente em `starter/checklist-sinais-codigo-ia.md`, seção final.
- **DORA 2025** (#11) foi pesquisado especificamente atrás de dado de qualidade/débito
  técnico e não trouxe número aplicável — fica citado, mas com a ressalva de fraqueza
  registrada, como o `_BRIEF.md` pede.
- Vários posts de blog agregador sobre "AI code bloat" (Medium, dev.to, listicles) apareceram
  nas buscas e foram preteridos em favor das fontes primárias acima — o paper do arXiv e os
  dois relatórios da GitClear já cobrem o mesmo terreno com metodologia declarada.
- Não usei nenhuma fonte sobre DDD tático (agregados, entidades, repositórios) além do
  necessário pra decidir onde ele NÃO entra — a exclusão é deliberada, não desconhecimento.

---

## Versão de 05/10: spec com DDD e BDD, OpenSpec e TLC

Abertas e conferidas em 05/10/2026 (conteúdo, número de imagens, idioma).

| # | URL | O que é | Onde entra |
|---|---|---|---|
| 12 | <https://douglasalonso.medium.com/ddd-na-pr%C3%A1tica-parte-2-ee3cedd26125> | Douglas Alonso, DDD na Prática parte 2: locadora de veículos, 16 histórias viram glossário e bounded contexts. 1 diagrama. PT | LAB 1 (S23) |
| 13 | <https://www.fabriciorissetto.com/blog/ddd-bounded-context/> | Fabrício Rissetto, Bounded Context: "Produto" em Vendas e em Suporte, context map, shared kernel. 3 diagramas. PT | S14, LAB 1 |
| 14 | <https://www.treinaweb.com.br/blog/o-que-e-o-event-storming> | TreinaWeb, O que é o Event Storming: a legenda das cores dos post-its. 2 imagens. PT | LAB 1, S47 |
| 15 | <https://medium.com/involves-rocks/usando-ddd-e-event-storming-para-remodelar-o-dom%C3%ADnio-de-um-m%C3%B3dulo-legado-aa12a364616e> | Involves, DDD e Event Storming num módulo legado: fotos das paredes de post-it, de eventos até bounded context. PT | LAB 1 (leitura extra) |
| 16 | <https://fullcycle.com.br/domain-driven-design/> | Full Cycle, O que é DDD: subdomínios núcleo, suporte e genérico num streaming estilo Netflix. Diagramas. PT | S15, LAB 1 |
| 17 | <https://medium.com/@lilianborbadeoliveira/crit%C3%A9rios-de-aceita%C3%A7%C3%A3o-para-hist%C3%B3rias-de-usu%C3%A1rios-no-agile-finalidades-formatos-exemplos-e-e00ad43d3543> | Lílian Borba, critérios de aceitação: checklist de regra e cenário Dado/Quando/Então. PT | S25 |
| 18 | <https://dgosantos89.github.io/Gherkin-p1/> | Diego Santos, Usando todo o poder do Gherkin 1/2: Gherkin em português, exemplo ruim e corrigido. PT | S29 |
| 19 | <https://medium.com/@fernandesSamuel/simplificando-bdd-646fb58f676b> | Samuel Fernandes, Simplificando BDD: introdução leve. PT | leitura extra |
| 20 | <https://cucumber.io/blog/bdd/example-mapping-introduction/> | Matt Wynne, Introducing Example Mapping: as 4 cores de cartão. EN, fotos | S5, S25, S26 |
| 21 | <https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html> | Birgitta Böckeler, Understanding Spec-Driven-Development: Kiro, spec-kit and Tessl. Níveis spec-first, spec-anchored, spec-as-source; crítica ao excesso de markdown. EN | S3, S33 |
| 22 | <https://github.com/Fission-AI/OpenSpec> | OpenSpec: `npm install -g @fission-ai/openspec@latest`, `openspec init`, `/opsx:propose`, `/opsx:apply`, `/opsx:archive`. Node 20.19+. Testado: 1.14.0 | S34–S39, LAB 2 |
| 23 | <https://agent-skills.techleads.club/tlc-spec-driven/> | TLC spec-driven (Tech Leads Club, autor Felipe Rodrigues): `npx @tech-leads-club/agent-skills install -s tlc-spec-driven -a claude-code`. EARS, fases adaptativas, verificador com contexto limpo. Testado: 3.3.0 | S40–S41, LAB 2 |
| 24 | <https://www.tabnews.com.br/wildrik/spec-driven-development-quando-a-especificacao-vira-a-fonte-da-verdade-nao-o-codigo> | TabNews/wildrik, SDD: a spec como fonte da verdade. Panorama de junho/2026 (Spec Kit, OpenSpec, Kiro, Tessl). PT | leitura extra |

**Descartados:** Alura "Spec-Driven Development" (página de curso, sem imagem), Elemar Jr
sobre Event Storming (sem imagem), tutorial de Spec Kit no TabNews (sem imagem, usa Gemini
CLI).
