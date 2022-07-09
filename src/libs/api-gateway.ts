type params = { statusCode?: number, data?: any }

export const formatJSONResponse = ({ statusCode = 200, data }: params): any => {
  return {
    statusCode,
    body: JSON.stringify(data),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  }
}
