const updateUserByID = require('../teste4');
const { writeDataToFile, readDataFromFile } = require("../utils/fileUtils");


// Mock das funções de leitura e escrita de dados
jest.mock("../utils/fileUtils", () => ({
  readDataFromFile: jest.fn(),
  writeDataToFile: jest.fn(),
}));

describe("Testando updateUserByID", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test("deve atualizar usuário com sucesso e retoranr status 200", async () => {
    // Configurando requisição, resposta e usuários
    const req = {
      query: { id: 1 },
      body: { name: "Thais Suhre", job: "Desenvolvedora" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const data = [
      { id: 1, name: "Bianca Telini", job: "Designer" },
      { id: 2, name: "Roberth Souza", job: "Desenvolvedor" },
    ];
    readDataFromFile.mockResolvedValue(data);

    await updateUserByID(req, res);

    // Verificando se as funções mockadas são chamadas
    expect(readDataFromFile).toHaveBeenCalledTimes(1);
    expect(writeDataToFile).toHaveBeenCalledTimes(1);
    expect(writeDataToFile).toHaveBeenCalledWith([
      { id: 1, name: "Thais Suhre", job: "Desenvolvedora" },
      { id: 2, name: "Roberth Souza", job: "Desenvolvedor" },
    ]);

    // Verificando a resposta
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      name: "Thais Suhre",
      job: "Desenvolvedora",
    });
  });

  test(" deve retornar um erro quando há um erro ao salvar o usuário", async () => {

    const req = {
      query: { id: 1 },
      body: { name: "Lucas Gomes", job: "Desenvolvedor" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const data = [
      { id: 1, name: "Carolina Nunes", job: "Desenvolvedora" },
      { id: 2, name: "Raphael Pacheco", job: "Desenvolvedor" },
    ];
    readDataFromFile.mockResolvedValue(data);
    writeDataToFile.mockRejectedValue(new Error("Some error"));

    await updateUserByID(req, res);

    expect(readDataFromFile).toHaveBeenCalledTimes(1);
    expect(writeDataToFile).toHaveBeenCalledTimes(1);
    expect(writeDataToFile).toHaveBeenCalledWith([
      { id: 1, name: "Lucas Gomes", job: "Desenvolvedor" },
      { id: 2, name: "Raphael Pacheco", job: "Desenvolvedor" },
    ]);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Error updating user." });
  });
});
