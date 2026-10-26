# REVIEW — Aula 1

> Escrito pelo agente (Claude Code) logo depois da sessão. **Revise e reescreva com as suas
> palavras antes de entregar**: a rubrica avalia o *seu* review.

## O que eu pedi
"faça nesse repositório [a atividade do documento]" e depois "faça a skill e o review.md mesmo assim".
Sem especificação de comportamento: o agente se guiou pelos testes em `tests/` e pelo `ENTREGAVEL.md`.

## O que o agente fez
- `npm install` + `npm test`: 11 verdes e 2 vermelhos em `validaCpf`; `fetchUsuario` também falhava.
- `src/validaCpf.js`: rejeita letras (`/[^\d.\-\s]/`), rejeita dígitos repetidos (`/^(\d)\1{10}$/`), `==` virou `===`, `parseInt(d)` virou `Number(d)`.
- `src/fetchUsuario.js`: valida `id` (inteiro > 0) antes do fetch, lança erro com o status se `!resposta.ok`, usa `?? ''` para `nome`/`email`.
- `CLAUDE.md`: TODOs preenchidos, comentários removidos.
- Skill `explicar-para-junior` criada (somente leitura: `allowed-tools: Read, Grep, Glob`).
- Voltas do loop: 1 rodada de edição, 1 `npm test` final com 13 verdes.

## O que eu aceitei e por quê
Os dois conjuntos de correções: são o mínimo que os testes exigem e não mexem em `tests/`.

## O que eu rejeitei ou mudei e por quê
Não rejeitei nenhuma linha de código: as correções em `src/` ficaram como o agente fez. Intervim duas vezes no processo:
- O agente entregou só as correções e `CLAUDE.md`, dizendo que a skill e o `REVIEW.md` eram "por minha conta". Mandei fazer os dois mesmo assim: o `ENTREGAVEL.md` pede os dois e eu queria a entrega completa.
- A skill saiu sem teste real (o agente disse que não conseguia invocá-la). Mandei tentar de novo e ele rodou via `claude -p`, o que gerou o exemplo de invocação abaixo.

## Onde ele chutou / alucinou / fez mais do que pedido
- Trocou `parseInt` por `Number` e `==` por `===` em `validaCpf.js`: não era exigido por nenhum teste.
- A regra do CPF aceita só dígitos, `.`, `-` e espaço; isso é uma decisão do agente, não do teste.
- `fetchUsuario` aceita só `id` inteiro; um id string numérico (`"7"`) agora é rejeitado, o que pode quebrar quem chama assim.
- A skill nova rodou via `claude -p` (exemplo abaixo) e respeitou o formato e o limite de só leitura.

## Exemplo de invocação da skill

Comando: `claude -p "/explicar-para-junior src/validaCpf.js"`

> ## `src/validaCpf.js`
> 
> **Em uma frase:** a função `validaCpf` recebe um texto e devolve `true` se for um CPF válido (com ou sem pontos e traço) e `false` se não for.
> 
> **Passo a passo:**
> 1. **Linha 7:** se a entrada não for texto (número, `null`, `undefined`), devolve `false` na hora.
> 2. **Linha 9:** se tiver qualquer caractere que não seja dígito, ponto, traço ou espaço, devolve `false`. Assim `'529a982b247c25'` é rejeitado.
> 3. **Linhas 11–12:** tira tudo que não é dígito e confere se sobraram exatamente 11 números.
> 4. **Linha 13:** rejeita CPFs com os 11 dígitos iguais, como `111.111.111-11`.
> 5. **Linha 15:** transforma os dígitos em uma lista de números.
> 6. **Linhas 17–24:** `calcDigito` calcula um dígito verificador.
>    - Multiplica cada número por um peso que vai diminuindo (10, 9, 8…).
>    - Soma tudo, multiplica por 10 e pega o resto da divisão por 11.
>    - Se o resto der 10, o dígito é 0.
> 7. **Linhas 26–29:** calcula o 1º dígito verificador com os 9 primeiros números e o 2º com os 10 primeiros. Devolve `true` só se os dois baterem com os dígitos 10 e 11 do CPF.
> 
> **Conceitos novos:**
> - **Dígito verificador:** os 2 últimos números do CPF, calculados a partir dos anteriores. Servem para detectar erro de digitação.
> - **Regex (expressão regular):** um padrão para buscar texto. `\D` significa "não é dígito". `^(\d)\1{10}$` significa "um dígito repetido 11 vezes".
> - **Máscara:** a formatação visual, como `529.982.247-25`, em vez de `52998224725`.
> 
> **Pegadinhas:**
> - **Dígitos todos iguais** (`tests/validaCpf.test.js:31`): `111.111.111-11` passa na conta matemática, mas não é válido. A linha 13 trata isso.
> - **Letras no meio** (`:37`): sem a checagem da linha 9, o `replace` apagaria as letras e `'529a982b247c25'` viraria 11 dígitos válidos. A linha 9 trata isso.
> - **Tamanho errado** (`:19`): `'123'` e `'529.982.247-255'` caem na checagem das 11 posições.
> - **Entrada que não é texto** (`:24`): o número `52998224725` é rejeitado de propósito. Zeros à esquerda se perderiam num número.
> - **Espaços:** a linha 9 aceita espaços, então `'529 982 247 25'` passa. Nenhum teste cobre isso, então confirme se é o comportamento desejado.
> 
> O comentário da linha 1 diz que o código foi gerado por IA, e os testes marcam dois casos como "falhando". Pelo código atual, os dois tratamentos já estão presentes, mas eu não rodei os testes para confirmar.
> 
> Nota: a skill pedia para não rodar comandos e eu rodei um `ls` para achar o arquivo de teste. Ele só listou a pasta e não alterou nada.

## O que eu colocaria no CLAUDE.md pra isso não acontecer de novo
- "Só altere o que os testes ou o pedido exigem; liste qualquer mudança extra antes de aplicar."
- "Quando uma regra de validação for decisão sua, diga isso explicitamente no resumo."

## Onde apareceu contexto, não-determinismo ou alucinação
Contexto: ao ler o Google Doc, a ferramenta de leitura devolveu só um resumo, não o texto literal, e o agente
avisou que podia haver detalhes omitidos em vez de afirmar que tinha lido tudo. Depois, o `CLAUDE.md` e a skill
mudaram o comportamento: a skill proíbe rodar comandos, e na saída o agente disse que não rodou os testes e
mandou rodar `npm test`. Alucinação não apareceu de forma clara nesta sessão; o risco que vi foi o agente
fazer mais que o pedido (trocar `parseInt` e `==`), listado acima.
