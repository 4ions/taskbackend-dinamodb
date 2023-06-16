import { DynamoDB } from 'aws-sdk';
import { BD } from '../../bd/index';
import { Task } from '../../bd/interface/bd.interface';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();
const TASK_TABLE = process.env.TABLE_NAME;

export async function createTask(task:String, details?:String): Promise<Boolean>  {

    if(!task) throw new Error("Task is required")

    const taskFormat:Task = {
        taskId: uuidv4(),
        name: task as string,
    }

    if (details) taskFormat.details = details as string;

    const params = {
        TableName: TASK_TABLE as string,
        Item: taskFormat
    }

    try {
        await BD.put(params).promise();
        return true;
    } catch (err) {
        console.log("Error al crear la tarea: ", err);
        throw err;
    }
} 

export async function getAllTask(lastEvaluatedKey?: DynamoDB.DocumentClient.Key): Promise<{ tasks: Task[], lastEvaluatedKey?: DynamoDB.DocumentClient.Key }> {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: TASK_TABLE as string,
      Limit: 20, 
      ExclusiveStartKey: lastEvaluatedKey
    };
  
    try {
      const data = await BD.scan(params).promise();
      const tasks = data.Items as Task[];
      const response: { tasks: Task[], lastEvaluatedKey?: DynamoDB.DocumentClient.Key } = { tasks };
  
      if (data.LastEvaluatedKey) {
        response.lastEvaluatedKey = data.LastEvaluatedKey;
      }
  
      return response;
    } catch (err) {
      console.log("Error al obtener las tareas: ", err);
      throw err;
    }
  }

export function getTask(id:string): Promise<Task> {
    const params = {
        TableName: TASK_TABLE as string,
        Key: {
            taskId: id
        }
    }

    return new Promise((resolve, reject) => {
        BD.get(params, (err, data) => {
            if (err) {
                console.log("Error al obtener la tarea: ", err);
                reject(err);
            } else {
                resolve(data.Item as Task);
            }
        })
    })
}

export async function updateTask(id: string, task: string, details?:string): Promise<Boolean> {
    if (!id) throw new Error("Id is required")

    const params = {
        TableName: TASK_TABLE as string,
        Key: {
            taskId: id
        },
        UpdateExpression: "set #name = :name, details = :details",
        ExpressionAttributeNames: {
            "#name": "name"
        },
        ExpressionAttributeValues: {
            ":name": task,
            ":details": details
        }
    }

    try {
        await BD.update(params).promise();
        return true;
    } catch (err) {
        console.log("Error al actualizar la tarea: ", err);
        throw err;
    }
}


export async function deleteTask(id:string): Promise<Boolean> {
    if (!id) throw new Error("Id is required")
    const params = {
        TableName: TASK_TABLE as string,
        Key: {
            taskId: id
        }
    }

    try {
        await BD.delete(params).promise();
        return true;
    } catch (err) {
        console.log("Error al eliminar la tarea: ", err);
        throw err;
    }
}