import { APIGatewayEvent } from 'aws-lambda'

import { autoInjectable } from '../../config/ioc'
import { CepService } from '../../services/CepService'
import { jsonResponse } from '../response/jsonResponse'

@autoInjectable()
export class CepController {
  constructor (private cepService: CepService) {}

  async show (event: APIGatewayEvent) {
    const { cep } = event.pathParameters
    const result = await this.cepService.find(cep)
    return jsonResponse(result)
  }
}
