import { createTask } from '../controllers/task/task.controller';
import { BD } from '../bd/index';

describe('createTask', () => {
  let putMock: jest.Mock;

  beforeAll(() => {
    putMock = jest.fn().mockReturnValue({ promise: jest.fn() });
    BD.put = putMock;
  });

  afterEach(() => {
    putMock.mockClear();
  });

  it('should throw an error if task is missing', async () => {
    await expect(createTask('')).rejects.toThrow('Task is required');
    expect(putMock).not.toHaveBeenCalled();
  });

  it('should create a task with task and details', async () => {
    const task = 'Some task';
    const details = 'Task details';

    await expect(createTask(task, details)).resolves.toBe(true);

    expect(putMock).toHaveBeenCalledTimes(1);
    expect(putMock).toHaveBeenCalledWith({
      TableName: expect.any(String),
      Item: {
        taskId: expect.any(String),
        name: task,
        details: details,
      },
    });
  });

  it('should create a task without details', async () => {
    const task = 'Some task';

    await expect(createTask(task)).resolves.toBe(true);

    expect(putMock).toHaveBeenCalledTimes(1);
    expect(putMock).toHaveBeenCalledWith({
      TableName: expect.any(String),
      Item: {
        taskId: expect.any(String),
        name: task,
      },
    });
  });
});
