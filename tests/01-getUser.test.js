const { getUser, getUsers } = require('../teste1');
const { readDataFromFile, writeDataToFile } = require('../utils/fileUtils');
const { findUserByName } = require('../utils/findUserByName');

jest.mock('../utils/fileUtils');
jest.mock('../utils/findUserByName');

describe('getUser', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('Deve retornar o objeto de um usuário quando seu nome for procurado.', async () => {

    const data = [
      { id: 1, name: 'José Canjica Martins', access: 13 },
      { id: 2, name: 'Bernardo Barbosa', access: 10 }];
    const req = { query: { name: 'José Canjica Martins' } };

    // Configurando os mocks necesários para getUser
    readDataFromFile.mockResolvedValue(data);
    findUserByName.mockReturnValue(data[0]);
    writeDataToFile.mockResolvedValue();

    // Configurando a resposta
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getUser(req, res);

    // verificando status e json da resposta
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'José Canjica Martins', access: 14 });

    // Verificando as chamadas das funções mockadas
    expect(readDataFromFile).toHaveBeenCalledTimes(1);
    expect(findUserByName).toHaveBeenCalledWith('José Canjica Martins', data);
    expect(writeDataToFile).toHaveBeenCalledTimes(1);
    expect(writeDataToFile).toHaveBeenCalledWith(data);
  });

  test('deve retornar um erro quando o usuário não é encontrado', async () => {

    const data = [
      { id: 1, name: 'Sérgio Ruza', access: 10 },
      { id: 2, name: 'Valéria Menezes', access: 12 }
    ];
    const req = { query: { name: 'Rafael Luiz' } };


    readDataFromFile.mockResolvedValue(data);
    findUserByName.mockReturnValue(undefined);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });

    expect(readDataFromFile).toHaveBeenCalledTimes(1);
    expect(findUserByName).toHaveBeenCalledWith('Rafael Luiz', data);
    expect(writeDataToFile).not.toHaveBeenCalled();
  });

  test('deve retornar um erro quando ocorrer um erro na leitura de dados', async () => {
    const req = { query: { name: 'Matheus Goyas' } };

    readDataFromFile.mockRejectedValue(new Error('Some error'));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal error' });

    expect(readDataFromFile).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Some error');

  });

});

describe('getUsers', () => {
  test('deve retornar os dados dos usuários com status 200', async () => {
    // Mock da função readDataFromFile
    const mockUserData = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    readDataFromFile.mockResolvedValue(mockUserData);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUserData);
  });

  test('deve retornar um erro interno com status 500 em caso de falha na leitura do arquivo', async () => {
    // Mock da função readDataFromFile para simular erro
    const errorMessage = 'Erro na leitura do arquivo';
    readDataFromFile.mockRejectedValue(new Error(errorMessage));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro interno' });
    expect(console.error).toHaveBeenCalledWith(errorMessage);
  });
});
