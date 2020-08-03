import { APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'

import { CepService } from './services/CepService'
import { ViaCepProvider } from './providers/ViaCepProvider'
import { CepController } from './http/controllers/CepController'
import { WideNetProvider } from './providers/WideNetProvider'

const viaCepProvider = new ViaCepProvider()
const wideNetProvider = new WideNetProvider()
const cepService = new CepService([viaCepProvider, wideNetProvider])
const cepController = new CepController(cepService)

export const find: APIGatewayProxyHandler = async (event, _context) => {
  return cepController.show(event)
}
