import 'source-map-support/register'
import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
const XAWS = AWSXRay.captureAWS(AWS)

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

const s3 = new XAWS.S3({
   signatureVersion: 'v4'
})

const todosBucket = process.env.IMAGES_S3_BUCKET

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
   const todoId = event.pathParameters.todoId
   const uploadUrl = getUploadUrl(todoId)
   // DONE-TODO: Return a presigned URL to upload a file for a TODO item with the provided id
   return {
      statusCode: 201,
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(
         {
            uploadUrl
         }
      )
   }
}

function getUploadUrl(todoId: string) {
   return s3.getSignedUrl('putObject', {
      Bucket: todosBucket,
      Key: todoId
   })
}