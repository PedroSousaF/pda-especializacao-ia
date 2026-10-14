// Teste de exemplo para validar uma ferramenta MCP
// Execute com: npx jest exemplo-teste.test.js

// Função fictícia que simula uma tool do MCP
function buscarAlunosPorHabilidade(habilidade, alunosDb) {
  if (!habilidade || typeof habilidade !== 'string') {
    throw new Error('Habilidade deve ser uma string não-vazia');
  }

  if (habilidade.length > 100) {
    throw new Error('Habilidade não pode ter mais de 100 caracteres');
  }

  const habilidadeNormalizada = habilidade.toLowerCase().trim();

  return alunosDb.filter(aluno =>
    aluno.habilidades
      .map(h => h.toLowerCase())
      .includes(habilidadeNormalizada)
  );
}

// Base de dados de teste
const alunosFixture = [
  { id: 1, nome: 'Ana', habilidades: ['React', 'JavaScript', 'Node.js'] },
  { id: 2, nome: 'Bruno', habilidades: ['Python', 'Django', 'PostgreSQL'] },
  { id: 3, nome: 'Carla', habilidades: ['React', 'TypeScript', 'GraphQL'] },
];

// Testes
describe('buscarAlunosPorHabilidade', () => {

  test('retorna alunos com a habilidade solicitada', () => {
    const resultado = buscarAlunosPorHabilidade('React', alunosFixture);
    expect(resultado).toHaveLength(2);
    expect(resultado.map(a => a.nome)).toEqual(['Ana', 'Carla']);
  });

  test('ignora maiúsculas/minúsculas', () => {
    const resultado1 = buscarAlunosPorHabilidade('REACT', alunosFixture);
    const resultado2 = buscarAlunosPorHabilidade('react', alunosFixture);
    expect(resultado1).toEqual(resultado2);
  });

  test('remove espaços em branco antes/depois', () => {
    const resultado = buscarAlunosPorHabilidade('  React  ', alunosFixture);
    expect(resultado).toHaveLength(2);
  });

  test('retorna vazio se nenhuma correspondência', () => {
    const resultado = buscarAlunosPorHabilidade('Rust', alunosFixture);
    expect(resultado).toHaveLength(0);
  });

  test('lança erro se habilidade está vazia', () => {
    expect(() => buscarAlunosPorHabilidade('', alunosFixture))
      .toThrow('Habilidade deve ser uma string não-vazia');
  });

  test('lança erro se habilidade não é string', () => {
    expect(() => buscarAlunosPorHabilidade(123, alunosFixture))
      .toThrow('Habilidade deve ser uma string não-vazia');
  });

  test('lança erro se habilidade excede limite de caracteres', () => {
    const habilidadeMuiLonga = 'a'.repeat(101);
    expect(() => buscarAlunosPorHabilidade(habilidadeMuiLonga, alunosFixture))
      .toThrow('Habilidade não pode ter mais de 100 caracteres');
  });

  test('resiste a tentativa de prompt injection', () => {
    const injection = "React'; DROP TABLE alunos; --";
    const resultado = buscarAlunosPorHabilidade(injection, alunosFixture);
    // Deve buscar exatamente essa string, não executar nada
    expect(resultado).toHaveLength(0);
  });
});
