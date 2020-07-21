import 'source-map-support/register'
import { getUserId } from '../utils'
import { getTodos } from '../../businessLogic/todos'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
   const userId = getUserId(event);

   // DONE-TODO: Get all TODO items for a current user
   const items = await getTodos(userId);

   return {
      statusCode: 200,
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({items})
   }
}