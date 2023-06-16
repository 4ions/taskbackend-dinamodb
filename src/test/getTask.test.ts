import { getTask } from '../controllers/task/task.controller';
import { BD } from '../bd/index'; 

describe('getTask', () => {
  let getMock: jest.Mock;

  beforeAll(() => {
    getMock = jest.fn().mockImplementation((params, callback) => {
      if (params.Key.taskId === 'existingTaskId') {
        callback(null, { Item: { taskId: 'existingTaskId', name: 'Existing Task' } });
      } else {
        callback(new Error('Task not found'));
      }
    });
    BD.get = getMock;
  });

  afterEach(() => {
    getMock.mockClear();
  });

  it('should return the task if found', async () => {
    const taskId = 'existingTaskId';

    const result = await getTask(taskId);

    expect(getMock).toHaveBeenCalledTimes(1);

    expect(result).toEqual({ taskId: 'existingTaskId', name: 'Existing Task' });
  });

  it('should throw an error if task not found', async () => {
    const taskId = 'nonExistingTaskId';

    await expect(getTask(taskId)).rejects.toThrow('Task not found');
    expect(getMock).toHaveBeenCalledTimes(1);
  });
});
