// DONE-TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'g8pv4rmly6'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // DONE-TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-bsmxj55i.au.auth0.com',            // Auth0 domain
  clientId: 'WZzdD69DdlBbueDQK7nNgACMBHL2uCPc',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
