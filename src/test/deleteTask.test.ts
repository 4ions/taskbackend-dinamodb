import { deleteTask } from '../controllers/task/task.controller';
import { BD } from '../bd/index'; 

describe('deleteTask', () => {
  let deleteMock: jest.Mock;

  beforeAll(() => {
    deleteMock = jest.fn().mockReturnValue({ promise: jest.fn() });
    BD.delete = deleteMock;
  });

  afterEach(() => {
    deleteMock.mockClear();
  });

  it('should delete the task', async () => {
    const taskId = 'taskId';

    await expect(deleteTask(taskId)).resolves.toBe(true);

    expect(deleteMock).toHaveBeenCalledTimes(1);
    expect(deleteMock).toHaveBeenCalledWith({
      TableName: expect.any(String),
      Key: {
        taskId: taskId,
      },
    });
  });

  it('should throw an error if id is missing', async () => {
    await expect(deleteTask('')).rejects.toThrow('Id is required');
    expect(deleteMock).not.toHaveBeenCalled();
  });

  it('should throw an error if DynamoDB delete operation fails', async () => {
    const taskId = 'taskId';

    const errorMessage = 'Delete operation failed';
    deleteMock.mockReturnValueOnce({ promise: jest.fn().mockRejectedValueOnce(new Error(errorMessage)) });

    await expect(deleteTask(taskId)).rejects.toThrow('Delete operation failed');
    expect(deleteMock).toHaveBeenCalledTimes(1);
  });
});
