# starter/ da semana 4

```
starter/
|-- meu-primeiro-mcp/            <- LAB 2 da aula 7 e base do entregável
|-- decisao-escopo-template.md   <- o que a tool NÃO pode fazer (preencha antes do código)
`-- demos/
    |-- mcp-demo-vulneravel/     <- riscos 1 e 2 da aula 8 (inseguro de propósito)
    `-- supply-chain-sim/        <- risco 3 da aula 8 (simulação local e segura)
```

Tudo aqui é **JavaScript puro (ESM) com o SDK oficial v2** (`@modelcontextprotocol/server`
+ `zod`). Sem TypeScript e sem etapa de build: você edita o `.mjs` e reconecta.
Precisa de **Node 20+**.

Cada pasta tem o `espiao.mjs`: um intermediário sem dependência que fica entre o Claude
Code e o server e grava cada mensagem do protocolo no `conversa.log`. Conecte sempre pelo
espião durante a semana; no seu projeto final pode apontar direto pro `server.mjs`.
