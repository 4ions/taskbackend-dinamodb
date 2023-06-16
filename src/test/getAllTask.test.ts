import { getAllTask } from '../controllers/task/task.controller';
import { BD } from '../bd/index'; 

describe('getAllTask', () => {
  let scanMock: jest.Mock;

  beforeAll(() => {
    scanMock = jest.fn().mockReturnValue({ promise: jest.fn() });
    BD.scan = scanMock;
  });

  afterEach(() => {
    scanMock.mockClear();
  });

  it('should return tasks and lastEvaluatedKey if available', async () => {
    const mockData = {
      Items: [{ taskId: '1', name: 'Task 1' }, { taskId: '2', name: 'Task 2' }],
      LastEvaluatedKey: { id: 'lastKey' },
    };
    scanMock.mockReturnValueOnce({ promise: jest.fn().mockResolvedValueOnce(mockData) });

    const result = await getAllTask();

    expect(scanMock).toHaveBeenCalledTimes(1);
    expect(scanMock).toHaveBeenCalledWith({
      TableName: expect.any(String),
      Limit: 20,
      ExclusiveStartKey: undefined,
    });

    expect(result).toEqual({
      tasks: [{ taskId: '1', name: 'Task 1' }, { taskId: '2', name: 'Task 2' }],
      lastEvaluatedKey: { id: 'lastKey' },
    });
  });

  it('should return tasks without lastEvaluatedKey if not available', async () => {
    const mockData = {
      Items: [{ taskId: '1', name: 'Task 1' }, { taskId: '2', name: 'Task 2' }],
    };
    scanMock.mockReturnValueOnce({ promise: jest.fn().mockResolvedValueOnce(mockData) });

    const result = await getAllTask();

    expect(scanMock).toHaveBeenCalledTimes(1);
    expect(scanMock).toHaveBeenCalledWith({
      TableName: expect.any(String),
      Limit: 20,
      ExclusiveStartKey: undefined,
    });

    expect(result).toEqual({
      tasks: [{ taskId: '1', name: 'Task 1' }, { taskId: '2', name: 'Task 2' }],
    });
  });

  it('should throw an error if DynamoDB scan operation fails', async () => {
    const errorMessage = 'Scan operation failed';
    scanMock.mockReturnValueOnce({ promise: jest.fn().mockRejectedValueOnce(new Error(errorMessage)) });

    await expect(getAllTask()).rejects.toThrow('Scan operation failed');
    expect(scanMock).toHaveBeenCalledTimes(1);
  });
});
