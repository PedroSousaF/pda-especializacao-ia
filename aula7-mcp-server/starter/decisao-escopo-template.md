# DECISAO-ESCOPO.md

<!--
  Preencha antes de escrever a tool. O agente escreve a função; ele não sabe o que é
  perigoso no seu projeto. Na aula 8, no último bloco, alguém da turma lê este arquivo
  e as descrições das suas tools procurando poder demais.
-->

## O server

- **Projeto e domínio do catálogo (semana 2):**
- **Que dado ou sistema ele toca** (API, arquivo, planilha, banco):
- **Escopo em que você conecta** (`local`, `project` ou `user`) e por quê:

## Tool 1: `<nome>`

- **Recebe:**
- **Devolve (só os campos que a tarefa precisa):**
- **Precisa poder:** (a menor lista possível. Cada item é uma permissão que você concede)
  1.
- **Não pode, mesmo que fosse prático:** (pense em: escrever quando só devia ler, abrir
  arquivo fora de uma pasta, devolver dado pessoal de alguém, rodar comando, agir sem
  confirmação em algo que não dá pra desfazer)
  1.
  2.
- **Como o código garante:** (não vale "vou tomar cuidado". Tem que ser algo que um pedido
  educado não contorna: schema que recusa entrada fora do formato, caminho fixo, campo
  cortado da resposta, limite de tamanho, nenhuma credencial de escrita no processo)
  1.
  2.

## Tool 2: `<nome>`

(mesmas perguntas)

## Texto de terceiros

- **Alguma tool devolve texto escrito por outra pessoa** (issue, e-mail, comentário, nome
  de empresa)? Qual?
- **Se esse texto trouxesse uma ordem escondida**, o que o agente conseguiria fazer com as
  outras ferramentas que ele tem na sessão?
