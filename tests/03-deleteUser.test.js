const deleteUser = require('../teste3');
const { readDataFromFile, writeDataToFile } = require('../utils/fileUtils');

jest.mock('../utils/fileUtils');

describe('deleteUser', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should delete the user and return status 204', async () => {
    // Set up mock data and request query
    const data = [
      { id: 1, name: 'Alice', job: 'Engineer' },
      { id: 2, name: 'Bob', job: 'Developer' },
      { id: 3, name: 'Charlie', job: 'Designer' },
    ];
    const req = { query: { name: 'Bob' } };

    // Configure the necessary function mocks
    readDataFromFile.mockResolvedValue(data);
    writeDataToFile.mockResolvedValue();

    // Call the deleteUser function
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      sendStatus: jest.fn(),
    };

    await deleteUser(req, res);

    // Check the response
    expect(res.sendStatus).toHaveBeenCalledWith(204);

    // Check that the necessary functions were called
    expect(readDataFromFile).toHaveBeenCalledTimes(1);
    expect(writeDataToFile).toHaveBeenCalledTimes(1);
    expect(writeDataToFile).toHaveBeenCalledWith([
      { id: 1, name: 'Alice', job: 'Engineer' },
      { id: 3, name: 'Charlie', job: 'Designer' },
    ]);
  });

  test('should return an error if the user is not found', async () => {
    // Set up mock data and request query
    const data = [
      { id: 1, name: 'Alice', job: 'Engineer' },
      { id: 2, name: 'Bob', job: 'Developer' },
      { id: 3, name: 'Charlie', job: 'Designer' },
    ];
    const req = { query: { name: 'Eve' } };

    // Configure the necessary function mocks
    readDataFromFile.mockResolvedValue(data);

    // Call the deleteUser function
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteUser(req, res);

    // Check the response
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });

    // Check that the necessary functions were called
    expect(readDataFromFile).toHaveBeenCalledTimes(1);
    expect(writeDataToFile).not.toHaveBeenCalled();
  });

  test('should return an error if there is an error saving the user', async () => {
    // Set up mock data and request query
    const req = { query: { name: 'Bob' } };

    // Configure the necessary function mocks
    readDataFromFile.mockRejectedValue(new Error('Some error'));

    // Call the deleteUser function
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteUser(req, res);

    // Check the response
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error deleting user.' });

    // Check that the necessary functions were called
    expect(readDataFromFile).toHaveBeenCalledTimes(1);
    expect(writeDataToFile).toHaveBeenCalledTimes(0);
  });
});
