import ExtendedError from '../../src/utils/ExtendedError';

describe('ExtendedError', () => {
  test('should set message and statusCode correctly', () => {
    const message = 'Not found';
    const statusCode = 404;

    const error = new ExtendedError(message, statusCode);

    expect(error.message).toBe(message);
    expect(error.statusCode).toBe(statusCode);
  });
});