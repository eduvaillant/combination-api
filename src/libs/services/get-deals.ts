import { badGateway, badRequest, HttpResponse, ok } from '@libs/helpers'
import { formatDeals } from '@libs/helpers/format-deals'

import { APIGatewayProxyEventQueryStringParameters } from 'aws-lambda'
import Axios from 'axios'

export const getDealsService = async ({ currency }: APIGatewayProxyEventQueryStringParameters): Promise<HttpResponse> => {
  try {
    if (!currency) return badRequest('Missing `currency` query parameter!')
    const deals = await Axios.get('https://www.cheapshark.com/api/1.0/deals?upperPrice=15&pageSize=5')
    const currencyData = await Axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/${currency}.json`)
    const currencyConversion = currencyData.data[currency]
    return ok(formatDeals(deals.data, currencyConversion))
  } catch (error) {
    return badGateway(error.message)
  }
}
