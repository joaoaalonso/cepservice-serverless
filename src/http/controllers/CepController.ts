import { APIGatewayEvent } from 'aws-lambda'

import { jsonResponse } from '../response/jsonResponse'
import { CepService } from '../../services/CepService'

export class CepController {
  private cepSerivce: CepService

  constructor (cepSerivce: CepService) {
    this.cepSerivce = cepSerivce
  }

  async show (event: APIGatewayEvent) {
    const { cep } = event.pathParameters
    const result = await this.cepSerivce.find(cep)
    return jsonResponse(result)
  }
}
