# aula1-fundamentos

## O que é este projeto

Campo de treino da Aula 1 (Fundamentos) da Especialização em IA da PDA.
Projeto Node pequeno com funções utilitárias em `src/` e testes em `tests/`.

## Stack

- Node 18+ (JavaScript)
- ESM (`"type": "module"`): use `import`/`export`, com extensão `.js` nos imports
- Testes com o runner nativo `node --test` + `node:assert/strict` (sem dependências)

## Comandos

- `npm test` — roda todos os testes
- `npm run test:watch` — testes em watch

## Regras

- Os arquivos em `tests/` são a especificação. **Nunca edite testes** pra fazê-los passar.
- Só diga que terminou depois de rodar `npm test` e ver tudo verde; cole o resultado.
- Estilo: `const` em vez de `let`, sempre `===`, mensagens de erro em português.

## Como eu quero trabalhar com você

- Antes de editar, explique em 1–2 frases o que vai mudar e por quê.
- Mudanças pequenas e focadas. Uma tarefa por vez.
- Se não tiver certeza sobre uma API ou lib, consulte a documentação (MCP context7) em vez de chutar.
- Não faça mais do que foi pedido: sem refatorar nem criar arquivos fora do escopo.
