const deleteUser = require('../teste3');
const { readDataFromFile, writeDataToFile } = require('../utils/fileUtils');

jest.mock('../utils/fileUtils');

describe('Testando deleteUser', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('deve deletar um usuário com sucesso e responder com status 204', async () => {

    const data = [
      { id: 1, name: 'Cecilia Jardim', job: 'Engenheira' },
      { id: 2, name: 'João Alves', job: 'CEO' },
      { id: 3, name: 'Giuliano Petry', job: 'Desenvolvedor' },
    ];
    const req = { query: { name: 'Giuliano Petry' } };

    // Configurando as funções que precisam ser mockadas em deleteUser
    readDataFromFile.mockResolvedValue(data);
    writeDataToFile.mockResolvedValue();

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      sendStatus: jest.fn(),
    };

    await deleteUser(req, res);

    // Verificando a Resposta
    expect(res.sendStatus).toHaveBeenCalledWith(204);

    // Verificando se as funções mockadas foram chamadas
    expect(readDataFromFile).toHaveBeenCalledTimes(1);
    expect(writeDataToFile).toHaveBeenCalledTimes(1);
    expect(writeDataToFile).toHaveBeenCalledWith([
      { id: 1, name: 'Cecilia Jardim', job: 'Engenheira' },
      { id: 2, name: 'João Alves', job: 'CEO' },
    ]);
  });

  test('deve retornar um erro quando o usuário não existir', async () => {

    const data = [
      { id: 1, name: 'Vitória Galvão', job: 'Recursos Humanos' },
      { id: 2, name: 'Lucas Bernardo', job: 'Advogado' },
      { id: 3, name: 'Gabriel Coelho', job: 'Desenvolvedor' },
    ];
    const req = { query: { name: 'Raisa Barreto' } };

    readDataFromFile.mockResolvedValue(data);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });

    expect(readDataFromFile).toHaveBeenCalledTimes(1);
    expect(writeDataToFile).not.toHaveBeenCalled();
  });

  test('deve retornar um erro quando houver um erro interno ao deletar um usuário', async () => {

    const req = { query: { name: 'Roberto Gargamel' } };

    readDataFromFile.mockRejectedValue(new Error('Some error'));

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error deleting user.' });

    expect(readDataFromFile).toHaveBeenCalledTimes(1);
    expect(writeDataToFile).toHaveBeenCalledTimes(0);
  });
});
