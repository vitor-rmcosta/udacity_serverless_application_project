import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

const XAWS = AWSXRay.captureAWS(AWS)

import { TodoItem } from '../models/TodoItem'

export class TodoAccess {

   constructor(
      private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
      private readonly todosTable = process.env.TODOS_TABLE,
      private readonly userIdIndex = process.env.USER_ID_INDEX) {}
   
   async createTodo(newItem : TodoItem): Promise<TodoItem> {
      await this.docClient
         .put({
            TableName: this.todosTable,
            Item: newItem
         }).promise();
      return newItem
   }

   async updateTodo(newItem : TodoItem): Promise<TodoItem> {
      await this.docClient
         .put({
            TableName: this.todosTable,
            Item: newItem
         }).promise();
      return newItem
   }

   async getTodo(todoId : string){
      const result = await this.docClient.get({
         TableName: this.todosTable,
         Key:{
            todoId: todoId
          },
      }).promise()
   
      return result.Item
   }

   async getTodos(userId : string){
      const result = await this.docClient.query({
         TableName: this.todosTable,
         IndexName: this.userIdIndex,
         KeyConditionExpression: 'userId = :userId',
         ExpressionAttributeValues: {
            ':userId': userId,
         },
      }).promise()
   
      return result.Items
   }

   async deleteTodo(todoId: string) {
      await this.docClient
         .delete({
            Key: {
               todoId: todoId
            },
            TableName: this.todosTable,
         })
         .promise()
      return todoId
   }
   
}