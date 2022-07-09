import { formatJSONResponse } from '@libs/api-gateway'

import { APIGatewayProxyEvent } from 'aws-lambda'
import Axios from 'axios'

export const handler = async (event: APIGatewayProxyEvent): Promise<any> => {
  try {
    const { queryStringParameters = {} } = event

    const { currency } = queryStringParameters

    if (!currency) {
      return formatJSONResponse({
        statusCode: 400,
        data: {
          message: 'Missing `currency` query parameter',
          path: event.path
        }
      })
    }

    const deals = await Axios.get('https://www.cheapshark.com/api/1.0/deals?upperPrice=15&pageSize=5')

    const currencyData = await Axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/${currency}.json`)

    const currencyConversion = currencyData.data[currency]

    const repricedDeals = deals.data.map(deal => {
      const {
        title,
        storeID,
        salePrice,
        normalPrice,
        savings,
        steamRatingPercent,
        releaseDate
      } = deal

      return {
        title,
        storeID,
        salePrice: salePrice * currencyConversion,
        normalPrice: normalPrice * currencyConversion,
        savingsPercent: savings,
        steamRatingPercent,
        releaseDate: new Date(releaseDate * 1000).toDateString()
      }
    })

    return formatJSONResponse({
      data: repricedDeals
    })
  } catch (error) {
    return formatJSONResponse({
      statusCode: 502,
      data: {
        message: error.message
      }
    })
  }
}
