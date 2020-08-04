import 'mocha'
import 'reflect-metadata'
import { expect } from 'chai'

import { ViaCepProvider } from './ViaCepProvider'

describe('ViaCepProvider',
  function () {
    it('should return postal code data from ViaCep', async function () {
      const viaCepProvider = new ViaCepProvider()
      const result = await viaCepProvider.find('05411000')
      expect(result).to.have.property('postalCode')
    })
  })
