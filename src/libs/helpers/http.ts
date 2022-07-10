export type HttpResponse = {
  statusCode: number
  data: any
}

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  data
})

export const badRequest = (message: string): HttpResponse => ({
  statusCode: 400,
  data: {
    message
  }
})

export const badGateway = (message: string): HttpResponse => ({
  statusCode: 502,
  data: {
    message
  }
})
