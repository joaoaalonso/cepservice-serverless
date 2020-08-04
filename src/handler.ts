import 'source-map-support/register'
import { APIGatewayProxyHandler } from 'aws-lambda'

import { container } from 'config/ioc'

import { CepController } from 'http/controllers/CepController'

const cepController = container.resolve(CepController)

export const find: APIGatewayProxyHandler = async (event, _context) => {
  return cepController.show(event)
}
