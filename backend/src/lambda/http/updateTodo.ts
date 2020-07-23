import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { updateTodo } from '../../businessLogic/todos'
import { getUserId } from '../utils'
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
   console.log("ENTROU AQUI");

   const todoId = event.pathParameters.todoId
   const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
   const userId = getUserId(event);

   console.log("PASSOU DO GET USER ID");

   if(!updatedTodo.name || !updatedTodo.dueDate || updatedTodo.done === undefined){
      return {
         statusCode: 400,
         headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
         },
         body: JSON.stringify(
            {
               item: updatedTodo
            }
            )
         }
   }
   
   // DONE-TODO: Update a TODO item with the provided id using values in the "updatedTodo" object 
   const item = await updateTodo(updatedTodo, todoId, userId);

   console.log("PASSOU DO UPDATE TODO");
   console.log(item);

   return {
      statusCode: 201,
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
         item
      })
   }
}
