const createUser = require('../teste2');
const { readDataFromFile, writeDataToFile } = require('../utils/fileUtils');

jest.mock('../utils/fileUtils');

describe('Testando createUser:', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('deve criar um novo usuário e retorná-lo', async () => {

    const data = [{ id: 1, name: 'Bernardo Lavinas', job: 'Desenvolvedor' }];
    const req = { body: { name: 'Guilherme Santiago', job: 'Desenvolvedor' } };

    // Configurando os mocks necessários para createUser
    readDataFromFile.mockResolvedValue(data);
    writeDataToFile.mockResolvedValue();

    // Configurando a resposta de createUser
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createUser(req, res);

    // Verificando a resposta de createUser
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 2, name: 'Guilherme Santiago', job: 'Desenvolvedor' });

    // Verificando a chamada das funções mockadas
    expect(readDataFromFile).toHaveBeenCalledTimes(1);
    expect(writeDataToFile).toHaveBeenCalledTimes(1);
    expect(writeDataToFile).toHaveBeenCalled();
  });

  test('deve retornar um erro quando o nome do usuário for repetido', async () => {

    const data = [{ id: 1, name: 'Julio Silveira', job: 'Desenvolvedor' }];
    const req = { body: { name: 'Julio Silveira', job: 'Tech Leader' } };

    readDataFromFile.mockResolvedValue(data);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'User already exists.' });

    expect(readDataFromFile).toHaveBeenCalledTimes(1);
    expect(writeDataToFile).not.toHaveBeenCalled();
  });

  test('deve retornar uma mensagem de erro quando houver erro ao salvar o usuário', async () => {

    const req = { body: { name: 'Johnatas Henrique', job: 'Product Owner' } };

    readDataFromFile.mockResolvedValue([]);
    writeDataToFile.mockRejectedValue(new Error('Some error'));

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error saving user.' });

    expect(readDataFromFile).toHaveBeenCalledTimes(1);
    expect(writeDataToFile).toHaveBeenCalledTimes(1);
  });
});
