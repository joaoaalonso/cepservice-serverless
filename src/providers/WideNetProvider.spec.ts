import 'mocha'
import { expect } from 'chai'

import { WideNetProvider } from './WideNetProvider'

describe('WideNetProvider',
  function () {
    it('should return postal code data from WideNet', async function () {
      const wideNetProvider = new WideNetProvider()
      const result = await wideNetProvider.find('05411000')
      expect(result).to.have.property('postalCode')
    })
  })
