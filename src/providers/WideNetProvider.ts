import axios from 'axios'

import { CepProvider } from './CepProvider'

interface WideNet {
  status: number;
  ok: string;
  code: string;
  state: string;
  city: string;
  district: string;
  address: string;
  statusText: string;
}

export class WideNetProvider implements CepProvider {
  async find (postalCode: string): Promise<PostalCode> {
    const uri = `http://apps.widenet.com.br/busca-cep/api/cep.json?code=${postalCode}`
    const { data } = await axios.get<WideNet>(uri)

    return this.convertData(data)
  }

  private convertData (data: WideNet): PostalCode {
    return {
      postalCode: data.code,
      state: data.state,
      city: data.city,
      address: data.address,
      neighborhood: data.district,
      provider: 'WideNet'
    }
  }
}
