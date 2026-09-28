# Referências: Semana 4 (aulas 7 e 8)

Todas abertas e conferidas em 27/09/2026. Fonte original sempre que existe; agregador só
onde a fonte original não abriu (marcado).

| # | fonte | o que é | onde entra |
|---|---|---|---|
| 1 | [code.claude.com/docs/en/mcp](https://code.claude.com/docs/en/mcp) | MCP no Claude Code: `claude mcp add`, escopos local/project/user, tool search (padrão, `ENABLE_TOOL_SEARCH`), limite de saída (aviso 10k, corte 25k tokens), descrição cortada em 2.048 caracteres, conectores do claude.ai, resources com `@`, prompts como comando | S19, S24, S28–S31, S35, LAB 2 |
| 2 | [code.claude.com/docs/en/skills](https://code.claude.com/docs/en/skills) | skills: quando cada parte carrega, `allowed-tools` (pré-aprova, não restringe), `disallowed-tools`, precedência pessoal > projeto, SKILL.md < 500 linhas | S9, S10, S14 |
| 3 | [platform.claude.com/.../agent-skills/overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) | os 3 níveis com números: ~100 tokens de metadados, corpo < 5k, arquivos extras zero até ler | S10, S11, Kahoot 8 |
| 4 | [platform.claude.com/.../agent-skills/best-practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) | como apontar arquivos de referência dentro do SKILL.md | S12 |
| 5 | [code.claude.com/docs/en/changelog](https://code.claude.com/docs/en/changelog) | v2.1.280 (22/09): Opus 5.5 padrão, Pro/Team Standard de Sonnet pra Opus; v2.1.281–283: correções de MCP | S5, Giro 1 |
| 6 | [openai.com/index/introducing-gpt-6-sol-and-luna](https://openai.com/index/introducing-gpt-6-sol-and-luna/) + [release notes](https://openai.com/products/release-notes/) | GPT-6 Sol e Luna no Codex e na API, preço 50% menor (22/09) | S6, Giro 2 |
| 7 | [axios.com/2026/09/19/google-safety-incidents-testing-hacks](https://www.axios.com/2026/09/19/google-safety-incidents-testing-hacks) | agente Gemini invadiu 3 empresas reais num teste da Irregular (maio/2026, confirmado em 19/09) | S7, Giro 3 |
| 8 | [modelcontextprotocol.io/docs/2026-07-28/learn/architecture](https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture) | host cria um client por server | S23 |
| 9 | [modelcontextprotocol.io/specification/2026-07-28/server/tools](https://modelcontextprotocol.io/specification/2026-07-28/server/tools) (e `/resources`, `/prompts`) | tools model-controlled, resources application-driven, prompts user-controlled; formato de `tools/call` | S21, S24 |
| 10 | [modelcontextprotocol.io/specification/2026-07-28/changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog) | spec de julho: sem `initialize`, com `server/discover`; sampling, roots e logging em desuso | S25 |
| 11 | [modelcontextprotocol.io/quickstart/server](https://modelcontextprotocol.io/quickstart/server) | guia oficial com o SDK v2 (`@modelcontextprotocol/server`); aviso de não usar `console.log` em stdio | S21, starter |
| 12 | [anthropic.com/engineering/advanced-tool-use](https://www.anthropic.com/engineering/advanced-tool-use) | 5 servers, 58 tools, ~55 mil tokens de definição; GitHub 35 tools ~26 mil | S29 |
| 13 | [anthropic.com/engineering/code-execution-with-mcp](https://www.anthropic.com/engineering/code-execution-with-mcp) | caso de 150 mil pra 2 mil tokens trocando definições carregadas por código sob demanda | S31 (fala) |
| 14 | [claude.com/blog/skills-explained](https://claude.com/blog/skills-explained) | "MCP connects Claude to data; Skills teach Claude what to do with that data." | S26 |
| 15 | [genai.owasp.org/resource/owasp-genai-llm-top-10-2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/) | OWASP Top 10 para LLM 2026, publicado em 03/08/2026 | S32 |
| 16 | [securityboulevard.com/2026/09/owasp-llm-top-10-2026-...](https://securityboulevard.com/2026/09/owasp-llm-top-10-2026-every-move-points-the-same-direction/) | **agregador**: a lista 2026 completa com os números (a página da OWASP pede download do PDF). Conferida com uma segunda fonte (aembit.io, 15/09/2026) | S32 |
| 17 | [genai.owasp.org/llm-top-10](https://genai.owasp.org/llm-top-10/) | lista 2025 e páginas por risco (LLM01, LLM05, ...) | S32, material de apoio |
| 18 | [simonwillison.net/2025/Jun/16/the-lethal-trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) | a tríade letal | S34 |
| 19 | [safebreach.com/blog/invitation-is-all-you-need-hacking-gemini](https://www.safebreach.com/blog/invitation-is-all-you-need-hacking-gemini/) | convite de agenda com injeção indireta sequestrando o Gemini (06/08/2025) | S33 |
| 20 | [invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks) | tool poisoning (01/04/2025) | aula 8, risco 3 |
| 21 | [invariantlabs.ai/blog/mcp-github-vulnerability](https://invariantlabs.ai/blog/mcp-github-vulnerability) | issue pública fazendo o agente vazar repo privado via GitHub MCP (26/05/2025) | aula 8, risco 1 |
| 22 | [thehackernews.com/2025/09/first-malicious-mcp-server-found.html](https://thehackernews.com/2025/09/first-malicious-mcp-server-found.html) | **agregador** (o post original da Koi Security redireciona): `postmark-mcp` mandando cópia oculta dos e-mails | aula 8, risco 3 |
| 23 | GitHub Advisories [GHSA-5cgr-j3jf-jw3v](https://github.com/advisories/GHSA-5cgr-j3jf-jw3v), [GHSA-9xwc-hfwc-8w59](https://github.com/advisories/GHSA-9xwc-hfwc-8w59), [GHSA-j22h-9j4x-23w5](https://github.com/advisories/GHSA-j22h-9j4x-23w5) | 3 CVEs no `mcp-server-git` da Anthropic | aula 8, risco 3 |
| 24 | [owasp.org/projects/mcp-top-10](https://owasp.org/projects/mcp-top-10) | OWASP MCP Top 10 (beta): MCP03 Tool Poisoning | aula 8, risco 3 |
| 25 | [modelcontextprotocol.io/docs/2026-07-28/tools/inspector](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector) | MCP Inspector (Node 22.19+) | aula 8, riscos 2 e 3 |
| 26 | [developers.google.com/workspace/guides/configure-mcp-servers](https://developers.google.com/workspace/guides/configure-mcp-servers) | servers MCP oficiais do Google Workspace (exigem projeto no Google Cloud + OAuth); atualizado em 18/09/2026 | FAQ, alternativa ao conector |
| 27 | [support.kahoot.com/.../115002812547](https://support.kahoot.com/hc/en-us/articles/115002812547-How-to-import-questions-from-a-spreadsheet-to-your-kahoot) | formato da planilha de importação do Kahoot | LAB 1 |
| 28 | [brasilapi.com.br](https://brasilapi.com.br) | API pública do tema MCP Brasil (CEP, feriados, CNPJ) | entregável, aula 8 |

**Repetição no curso:** `code.claude.com/docs/en/skills` aparece na semana 3 e aqui (2 vezes,
dentro do limite). `code.claude.com/docs/en/changelog` aparece nas semanas 3 e 4 (2 vezes).
`genai.owasp.org` apareceu na semana 2 (LLM01, página da lista 2025); aqui entra a edição
2026, que é outra página.

**Não verificado e por isso fora dos slides:** a linha exata que o `/context` mostra pras
tools de MCP (a doc oficial não detalha; o S30 pede pra medir no ensaio).
