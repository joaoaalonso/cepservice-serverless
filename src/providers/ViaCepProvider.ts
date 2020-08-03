import axios from 'axios'

import { CepProvider } from './CepProvider'

interface ViaCep {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    unidade: string;
    ibge: string;
    gia: string;
}

export class ViaCepProvider implements CepProvider {
  async find (postalCode: string): Promise<PostalCode> {
    const uri = `https://viacep.com.br/ws/${postalCode}/json/unicode/`
    const { data } = await axios.get<ViaCep>(uri)

    return this.convertData(data)
  }

  private convertData (data: ViaCep): PostalCode {
    return {
      postalCode: data.cep,
      state: data.uf,
      city: data.localidade,
      address: data.logradouro,
      neighborhood: data.bairro,
      provider: 'ViaCep'
    }
  }
}
