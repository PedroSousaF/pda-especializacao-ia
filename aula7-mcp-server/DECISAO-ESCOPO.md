# DECISAO-ESCOPO.md

## O server

- **Projeto e domínio do catálogo (semana 2):** `mapa-de-erros`
  (https://github.com/PedroSousaF/mapa-de-erros): mostra a estudantes e professores em quais
  tópicos alguém mais erra e o que revisar primeiro.
- **Que dado ou sistema ele toca:** arquivos JSON de respostas de uma turma, numa pasta fixa
  `meu-mcp-server/dados/`. Cada resposta é `{ questaoId, topico, correta }`. Nenhuma API, nenhum banco.
- **Escopo em que você conecta:** `local`. O server lê dados de estudantes; ele só deve existir
  na minha máquina, neste projeto, e não ir para o `.mcp.json` versionado de mais ninguém.

## Tool 1: `diagnosticar_turma`

- **Recebe:** `arquivo`, o nome de um arquivo de respostas dentro de `dados/` (ex.: `turma-a.json`).
- **Devolve (só os campos que a tarefa precisa):** por tópico: nome, erros, total, taxa de erro.
  Ordenado do tópico com mais erro para o com menos. Não devolve `questaoId` nem o conteúdo bruto do arquivo.
- **Precisa poder:**
  1. Ler um arquivo `.json` dentro de `dados/`.
- **Não pode, mesmo que fosse prático:**
  1. Ler qualquer arquivo fora de `dados/` (código, `.env`, `~/.ssh`, outros projetos).
  2. Escrever, apagar ou renomear qualquer arquivo, inclusive dentro de `dados/`.
  3. Devolver ao agente texto livre vindo do arquivo (o nome do tópico é escrito por quem montou
     a lista de questões; se vier com uma ordem escondida, ela não pode chegar ao agente).
  4. Ler arquivos grandes o bastante para travar o processo ou lotar a janela de contexto.
- **Como o código garante:**
  1. `arquivo` tem que casar com `^[a-z0-9-]{1,40}\.json$`: sem `/`, sem `..`, sem caminho
     absoluto. O caminho final é montado pelo server e conferido para estar dentro de `dados/`.
  2. O server só importa `readFile` e `stat`; não existe chamada de escrita no código.
  3. Cada `topico` tem que casar com `^[a-z0-9-]{1,40}$`. Tópico fora do formato é recusado e
     não é repetido na mensagem de erro.
  4. Arquivo acima de 100 KB é recusado antes de ser lido.
  5. Mensagens de erro são fixas e não incluem trecho do arquivo lido.

## Texto de terceiros

- **Alguma tool devolve texto escrito por outra pessoa?** Sim: o nome do tópico vem do arquivo
  de respostas, montado por professor ou por uma planilha exportada.
- **Se esse texto trouxesse uma ordem escondida**, o agente teria, na mesma sessão, `Read`,
  `Bash` e `Edit` do Claude Code: poderia ler arquivos privados, rodar comandos ou alterar
  código. Por isso o tópico passa por allow-list de formato (item 3 acima) em vez de ser
  repassado como veio.
