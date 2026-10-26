---
name: explicar-para-junior
description: Explica um arquivo de código para uma pessoa júnior, em português simples. Use quando o usuário pedir pra explicar, entender ou "traduzir" um arquivo, ou invocar /explicar-para-junior.
allowed-tools: Read, Grep, Glob
---

# Explicar para júnior

## Entrada

`$ARGUMENTS` é o caminho de um arquivo (ex.: `src/validaCpf.js`). Se vier vazio, pergunte qual arquivo explicar.

## Passos

1. Leia o arquivo inteiro e, se existir, o teste correspondente em `tests/`.
2. Não edite nada e não rode comandos.
3. Use linguagem simples; explique jargão na primeira vez que aparecer.

## Formato de saída

1. **Em uma frase:** o que o arquivo faz.
2. **Passo a passo:** lista numerada, um item por bloco lógico do código.
3. **Conceitos novos:** até 3 termos que um júnior talvez não conheça, com uma linha cada.
4. **Pegadinhas:** casos de borda que o código trata (ou deveria tratar), citando o teste quando houver.
