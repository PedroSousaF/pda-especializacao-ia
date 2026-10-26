import { test } from "node:test";
import assert from "node:assert/strict";
import { diagnosticarTurma } from "../ferramentas.mjs";

test("diagnosticar_turma ordena tópicos do mais errado para o menos errado", async () => {
  const r = await diagnosticarTurma("turma-a.json");
  assert.deepEqual(r.map((t) => t.topico), ["fracoes", "geometria", "porcentagem"]);
  assert.deepEqual(r[0], { topico: "fracoes", erros: 2, total: 3, taxaErro: 67 });
});

// Os ataques do LOG-INJECTION-TEMPLATE.md, agora como regressão.
test("recusa entrada vazia e gigante sem repetir a entrada", async () => {
  await assert.rejects(() => diagnosticarTurma(""), /arquivo inválido/);
  const gigante = "a".repeat(100_000);
  await assert.rejects(() => diagnosticarTurma(gigante), (e) => e.message.length < 200);
});

test("não sai de dados/ nem vaza o conteúdo do arquivo", async () => {
  for (const ataque of ["../segredo-professor.txt", "../../package.json", "/etc/passwd", "..\\segredo.json"]) {
    await assert.rejects(() => diagnosticarTurma(ataque), (e) => !e.message.includes("CANARIO"));
  }
});

test("recusa tópico com instrução embutida", async () => {
  await assert.rejects(() => diagnosticarTurma("turma-b.json"), /fora do formato/);
});
