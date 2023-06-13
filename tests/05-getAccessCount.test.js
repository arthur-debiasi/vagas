const { readDataFromFile } = require('../utils/fileUtils');
const getAccessCount = require('../teste5');

jest.mock('../utils/fileUtils', () => ({
  readDataFromFile: jest.fn(),
}));

describe('Testando getAccessCount', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test('deve retornar a contagem de acessos ao usuário', async () => {
    // Configurando os mocks
    const req = {
      query: { name: 'Richard Peret' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const data = [
      { id: 1, name: 'Alessandra Ribeiro', job: 'QA', access: 5 },
      { id: 2, name: 'Richard Peret', job: 'Desenvolvedor', access: 10 },
      { id: 3, name: 'Mariana Demarchi', job: 'QA', access: 2 },
    ];
    readDataFromFile.mockResolvedValue(data);

    await getAccessCount(req, res);

    // Verificando se as funções mockadas foram chamadas
    expect(readDataFromFile).toHaveBeenCalledTimes(1);

    // Verificando a resposta
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'O usuário Richard Peret foi lido 10 vezes.' });
  });

  test('deve retornar um erro se o usuário não for encontrado', async () => {

    const req = {
      query: { name: 'Richard Peret' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const data = [
      { id: 1, name: 'Rafael Machado', access: 5 },
      { id: 2, name: 'Gustavo Boaz', access: 10 },
      { id: 3, name: 'Murilo Wolf', access: 2 },
    ];
    readDataFromFile.mockResolvedValue(data);

    await getAccessCount(req, res);

    expect(readDataFromFile).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Usuário not found.' });
  });

  test('deve retornar um erro se ocorrer um erro interno ao acessar as contagens', async () => {

    const req = {
      query: { name: 'Richard Peret' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    readDataFromFile.mockRejectedValue(new Error('Some error'));

    await getAccessCount(req, res);

    expect(readDataFromFile).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching user.' });
  });
});
