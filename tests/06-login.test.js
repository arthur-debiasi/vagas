const { comparePassword } = require('../auth/bcrypt');
const { generateJWT } = require('../auth/jwt');
const login = require('../teste6');

jest.mock('../auth/bcrypt', () => ({
  comparePassword: jest.fn(),
}));

jest.mock('../auth/jwt', () => ({
  generateJWT: jest.fn(),
}));

describe('Testando login', () => {
  test('deve retornar um token para o email e senha do administrador', async () => {
    const req = {
      body: {
        email: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const token = 'generatedToken';

    comparePassword.mockResolvedValue(true);
    generateJWT.mockReturnValue(token);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token });
  });

  test('deve retornar um erro para um email inválido', async () => {
    const req = {
      body: {
        email: 'invalid@example.com',
        password: process.env.DB_PASSWORD,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    comparePassword.mockResolvedValue(true);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email.' });
  });

  test('deve retornar um erro para uma senha inválida', async () => {
    const req = {
      body: {
        email: process.env.DB_USER,
        password: 'invalid123',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    comparePassword.mockResolvedValue(false);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid password.' });
  });
});
