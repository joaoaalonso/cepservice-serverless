import { Serverless } from 'serverless/aws'

const serverlessConfiguration: Serverless = {
  service: {
    name: 'serverless-ts'
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '>=1.72.0',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: [
    'serverless-webpack',
    'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'sa-east-1',
    apiGateway: {
      minimumCompressionSize: 1024
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1'
    }
  },
  functions: {
    find: {
      handler: 'src/handler.find',
      events: [
        {
          http: {
            method: 'get',
            path: '{cep}'
          },
          sns: {
            topicName: 'Order'
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration
