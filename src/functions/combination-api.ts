import { formatJSONResponse } from '@libs/helpers'
import { getDealsService } from '@libs/services'

import { APIGatewayProxyEvent } from 'aws-lambda'

export const handler = async (event: APIGatewayProxyEvent): Promise<any> => {
  const { queryStringParameters = {} } = event
  const response = await getDealsService(queryStringParameters)
  return formatJSONResponse(response)
}
