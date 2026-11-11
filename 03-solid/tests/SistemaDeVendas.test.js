const SistemaDeVendas = require("../src/SistemaDeVendas");

describe("Desafio 3: SOLID", () => {
  test("Processa venda com total e desconto", async () => {
    const sistema = new SistemaDeVendas();
    const pedido = { id: 1, clienteEmail: "a@a.com", itens: [{ preco: 1200, quantidade: 1 }] };
    const res = await sistema.processarVenda(pedido);
    expect(res.total).toBe(1080);
  });
});

describe("Desafio 3: SOLID — dependências injetadas", () => {
  const pedido = { id: 7, clienteEmail: "b@b.com", itens: [{ preco: 100, quantidade: 2 }] };

  test("usa repository e notificador fornecidos, sem desconto abaixo de 1000", async () => {
    const repository = { salvar: jest.fn() };
    const notificador = { notificar: jest.fn() };
    const sistema = new SistemaDeVendas({ repository, notificador });

    const res = await sistema.processarVenda(pedido);

    expect(res.total).toBe(200);
    expect(res.status).toBe("pago");
    expect(repository.salvar).toHaveBeenCalledWith(expect.objectContaining({ id: 7, total: 200 }));
    expect(notificador.notificar).toHaveBeenCalledWith("b@b.com", expect.any(Object));
  });

  test("rejeita pedido sem itens e não persiste nem notifica", async () => {
    const repository = { salvar: jest.fn() };
    const notificador = { notificar: jest.fn() };
    const sistema = new SistemaDeVendas({ repository, notificador });

    await expect(sistema.processarVenda({ id: 1, itens: [] })).rejects.toThrow("Pedido sem itens");
    expect(repository.salvar).not.toHaveBeenCalled();
    expect(notificador.notificar).not.toHaveBeenCalled();
  });
});
