export const formatJSONResponse = ({ statusCode, data }: { statusCode: number, data?: any }): any => {
  return {
    statusCode,
    body: JSON.stringify(data),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  }
}
