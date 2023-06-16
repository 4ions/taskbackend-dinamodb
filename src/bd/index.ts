import { DynamoDB } from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

//Conect to DynamoD
export const BD = new DynamoDB.DocumentClient({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string
    }
});


