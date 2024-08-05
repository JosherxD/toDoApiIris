import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, GetCommand, PutCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { ToDo } from '../../domain/clients/models/todoes.model';
import { ToDoesRepository } from '../../domain/clients/models/todoes.repository';
import { fromEnv } from "@aws-sdk/credential-providers";

export class ToDoesDb implements ToDoesRepository {
  private dynamoToDo: DynamoDBDocumentClient;
  private client: DynamoDBClient;

  constructor(private tableName: string) {
    this.client = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: fromEnv()
    });
    this.dynamoToDo = DynamoDBDocumentClient.from(this.client);
  }


  async getToDoes(): Promise<ToDo[] | undefined> {
    const params = {
      TableName: this.tableName,
    };
    try {
      const result = await this.dynamoToDo.send(new ScanCommand(params));
      const toDoes: ToDo[] = result.Items as ToDo[];
      return toDoes;
    } catch (error) {
      debugger
      console.log(error);
      console.error('Error getToDoes =>', error);
      throw new Error('Error base de datos');
    }
  }

  async getToDo(id: string): Promise<ToDo | undefined> {
    const params = {
      TableName: this.tableName,
      Key: { id },
    };
    try {
      const result = await this.dynamoToDo.send(new GetCommand(params));
      const toDo: ToDo = result.Item as ToDo;
      return toDo;
    } catch (error) {
      console.error('Error getToDo =>', error);
      throw new Error('Error base de datos');
    }
  }

  async createOrUpdateToDo(toDo: ToDo): Promise<boolean> {
    const params = {
      TableName: this.tableName,
      Item: toDo,
    };
    try {
      await this.dynamoToDo.send(new PutCommand(params));
      return true;
    } catch (error) {
      console.error('Error createOrUpdateToDo =>', error);
      throw new Error('Error base de datos');
    }
  }

  async deleteToDo(id: string): Promise<boolean> {
    const params = {
      TableName: this.tableName,
      Key: { id },
    };
    try {
      await this.dynamoToDo.send(new DeleteCommand(params));
      return true;
    } catch (error) {
      console.error('Error deleteToDo =>', error);
      throw new Error('Error base de datos');
    }
  }
}
