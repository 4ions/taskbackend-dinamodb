import { updateTask } from '../controllers/task/task.controller';
import { BD } from '../bd/index'; 

describe('updateTask', () => {
  let updateMock: jest.Mock;

  beforeAll(() => {
    updateMock = jest.fn().mockReturnValue({ promise: jest.fn() });
    BD.update = updateMock;
  });

  afterEach(() => {
    updateMock.mockClear();
  });

  it('should update the task', async () => {
    const taskId = 'taskId';
    const task = 'Updated Task';
    const details = 'Updated details';

    await expect(updateTask(taskId, task, details)).resolves.toBe(true);

    expect(updateMock).toHaveBeenCalledTimes(1);
    expect(updateMock).toHaveBeenCalledWith({
      TableName: expect.any(String),
      Key: {
        taskId: taskId,
      },
      UpdateExpression: 'set #name = :name, details = :details',
      ExpressionAttributeNames: {
        '#name': 'name',
      },
      ExpressionAttributeValues: {
        ':name': task,
        ':details': details,
      },
    });
  });

  it('should throw an error if id is missing', async () => {
    const task = 'Updated Task';
    const details = 'Updated details';

    await expect(updateTask('', task, details)).rejects.toThrow('Id is required');
    expect(updateMock).not.toHaveBeenCalled();
  });

  it('should throw an error if DynamoDB update operation fails', async () => {
    const taskId = 'taskId';
    const task = 'Updated Task';
    const details = 'Updated details';

    const errorMessage = 'Update operation failed';
    updateMock.mockReturnValueOnce({ promise: jest.fn().mockRejectedValueOnce(new Error(errorMessage)) });

    await expect(updateTask(taskId, task, details)).rejects.toThrow('Update operation failed');
    expect(updateMock).toHaveBeenCalledTimes(1);
  });
});
