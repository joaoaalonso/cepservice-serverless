import { promiseAny } from '../utils/promiseAny'
import { CepProvider } from '../providers/CepProvider'

export class CepService {
    private providers: CepProvider[]

    constructor (providers: CepProvider[]) {
      this.providers = providers
    }

    async find (postalCode: string): Promise<PostalCode> {
      this.validatePostalCode(postalCode)

      const iterables = this.providers.map(provider => provider.find(postalCode))
      try {
        const result = await promiseAny(iterables)
        return result
      } catch (e) {
        throw new Error('CEP não encontrado')
      }
    }

    private validatePostalCode (postalCode: string) {
      if (!postalCode) {
        throw new Error('CEP é obrigatório')
      }

      if (postalCode.length !== 8) {
        throw new Error('O CEP precisa conter 8 caracteres')
      }
    }
}
