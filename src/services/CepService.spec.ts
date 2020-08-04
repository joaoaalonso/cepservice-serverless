import 'mocha'
import 'reflect-metadata'
import { expect } from 'chai'

import { CepService } from './CepService'
import { CepProvider } from '../providers/CepProvider'

class FakeProvider implements CepProvider {
  async find (postalCode: string): Promise<PostalCode> {
    return new Promise((resolve, reject) => {
      if (postalCode === '12312312') {
        return reject(new Error('Postal code not found'))
      }

      resolve({
        postalCode,
        state: 'SP',
        city: 'São Paulo',
        address: 'Rua de teste',
        neighborhood: 'Teste',
        provider: 'Fake Provider'
      })
    })
  }
}

const cepService = new CepService([new FakeProvider()])

describe('CepService',
  function () {
    it('should return postal code data', async function () {
      const result = await cepService.find('05411000')
      expect(result).to.have.property('postalCode')
    })

    it('should return validation error for empty string', async function () {
      try {
        await cepService.find('')
      } catch (e) {
        expect(e.message).to.be.eql('CEP é obrigatório')
      }
    })

    it('should return validation error for invalid postal code', async function () {
      try {
        await cepService.find('123')
      } catch (e) {
        expect(e.message).to.be.eql('O CEP precisa conter 8 caracteres')
      }
    })

    it('should return postal code not found', async function () {
      try {
        await cepService.find('12312312')
      } catch (e) {
        expect(e.message).to.be.eql('CEP não encontrado')
      }
    })
  })
