import { TodoAccess } from '../dataLayer/todoAccess'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import * as uuid from 'uuid'

const todosBucket = process.env.IMAGES_S3_BUCKET
const todoAccess = new TodoAccess()

export async function getTodos(userId : string){
   return await todoAccess.getTodos(userId);
}
export async function deleteTodos(userId : string, todoId : string){
   return await todoAccess.deleteTodo(userId, todoId);
}
export async function updateTodo(updatedTodo : UpdateTodoRequest, todoId : string, userId : string){

  const existingTodo = await todoAccess.getTodo(todoId);

   const updatedItem = {
      todoId: todoId,
      userId: userId,
      createdAt: existingTodo.createdAt,
      attachmentUrl: existingTodo.attachmentUrl,
      ...updatedTodo
   }

   return await todoAccess.updateTodo(updatedItem);
}
export async function createTodo(
   newTodo : CreateTodoRequest,
   userId : string){

   const todoId = uuid.v4();

   const newItem = {
      userId,
      todoId,
      ...newTodo,
      done :false,
      createdAt : new Date().toISOString(),
      attachmentUrl: `https://${todosBucket}.s3.amazonaws.com/${todoId}`
   }

   return await todoAccess.createTodo(newItem);
}


 