import { test } from "node:test";
import assert from "node:assert/strict";
import { rolarDado } from "../ferramentas.mjs";

test("rolar_dado devolve um número entre 1 e o número de lados", () => {
  for (let i = 0; i < 500; i++) {
    const n = rolarDado(20);
    assert.ok(Number.isInteger(n));
    assert.ok(n >= 1 && n <= 20, `saiu ${n}`);
  }
});

test("rolar_dado recusa dado impossível", () => {
  assert.throws(() => rolarDado(1));
  assert.throws(() => rolarDado(2.5));
  assert.throws(() => rolarDado(5000));
});

// TODO (LAB 2, passo 4): um teste pra sua segunda tool.
// test("minha tool faz X", () => { ... });
