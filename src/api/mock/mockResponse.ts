export const mockResponse = <T>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), 400));
