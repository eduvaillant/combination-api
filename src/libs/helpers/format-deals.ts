type CheapSharkReponse = {
  title: string
  salePrice: number
  normalPrice: number
  steamRatingPercent: number
  releaseDate: number
}

export const formatDeals = (deals: CheapSharkReponse[], currency: number): any => {
  return deals.map(deal => {
    const {
      title,
      salePrice,
      normalPrice,
      steamRatingPercent,
      releaseDate
    } = deal
    return {
      title,
      salePrice: salePrice * currency,
      normalPrice: normalPrice * currency,
      steamRatingPercent,
      releaseDate: new Date(releaseDate * 1000).toISOString()
    }
  })
}
