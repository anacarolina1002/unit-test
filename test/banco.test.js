// tests/banco.test.js
const Banco = require('../src/banco');

describe('Banco', () => {
  let conta1;
  let conta2;

  beforeEach(() => {
    conta1 = new Banco('Conta Corrente', 1000);
    conta2 = new Banco('Conta Poupança', 500);
    conta3 = new Banco('Conta Corrente')
  });

  test('Depositar dinheiro corretamente', () => {
    conta1.depositar(200);
    expect(conta1.obterSaldo()).toStrictEqual(1200);
  });

  test('Sacar dinheiro corretamente', () => {
    conta1.sacar(300);
    expect(conta1.obterSaldo()).toStrictEqual(700);
  });

  test('Bloquear saque acima do saldo', () => {
    expect(() => conta1.sacar(1200)).toThrow('Saldo insuficiente');
  });

  test('Transferir dinheiro para outra conta', () => {
    conta1.transferir(200, conta2);
    expect(conta1.obterSaldo()).toStrictEqual(800);
    expect(conta2.obterSaldo()).toStrictEqual(700);
  });

  test('Obter histórico de transações', () => {
    conta1.depositar(100);
    conta1.sacar(50);
    expect(conta1.obterHistorico()).toEqual([
      { tipo: 'Depósito', valor: 100 },
      { tipo: 'Saque', valor: 50 }
    ]);
  });

  test('Definir e verificar limite de saque', () => {
    conta1.definirLimiteDeSaque(500);
    expect(conta1.verificarLimiteDeSaque(300)).toStrictEqual(true);
    expect(() => conta1.verificarLimiteDeSaque(600)).toThrow('Saque acima do limite permitido');
  });

  test('Aplicar juros corretamente', () => {
    conta1.aplicarJuros(10); // 10% de 1000 é 100
    expect(conta1.obterSaldo()).toStrictEqual(1100);
  });

  test('Pagar uma conta corretamente', () => {
    conta1.pagarConta(100, 'Conta de luz');
    expect(conta1.obterSaldo()).toStrictEqual(900);
    expect(conta1.obterHistorico()).toContainEqual({ tipo: 'Pagamento', valor: 100, descricao: 'Conta de luz' });
  });

  test('Obter o total depositado', () => {
    conta1.depositar(500);
    conta1.depositar(300);
    expect(conta1.obterTotalDepositado()).toStrictEqual(800);
  });
});
