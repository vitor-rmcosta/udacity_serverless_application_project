import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { getUserId } from '../utils'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodo } from '../../businessLogic/todos'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
   // DONE-TODO: Implement creating a new TODO item

   const userId = getUserId(event);
   const newTodo: CreateTodoRequest = JSON.parse(event.body);
   
   if(!newTodo.name || !newTodo.dueDate){
      return {
         statusCode: 400,
         headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
         },
         body: JSON.stringify(
            {
               item: newTodo
            }
            )
         }
   }
   const newItem = await createTodo(newTodo, userId);

   return {
      statusCode: 201,
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(
         {
            item: {
               ...newItem,
            }
         }
      )
   }
}
