import { promiseAny } from '../utils/promiseAny'
import { injectable, injectAll } from '../config/ioc'
import { CepProvider } from '../providers/CepProvider'

@injectable()
export class CepService {
  constructor (@injectAll('CepProvider') private providers: CepProvider[]) {}

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
