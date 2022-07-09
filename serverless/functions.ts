import type { AWS } from '@serverless/typescript'

const functions: AWS['functions'] = {
  combinationAPI: {
    handler: 'src/functions/combination-api/index.handler',
    events: [
      {
        httpApi: {
          path: '/gameDeals',
          method: 'get'
        }
      }
    ]
  }
}

export default functions
