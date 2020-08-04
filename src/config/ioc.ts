import 'reflect-metadata'
import { container, injectable, autoInjectable, inject, injectAll } from 'tsyringe'

import { ViaCepProvider } from '../providers/ViaCepProvider'
import { WideNetProvider } from '../providers/WideNetProvider'

container.register('CepProvider', { useClass: ViaCepProvider })
container.register('CepProvider', { useClass: WideNetProvider })

export { container, injectable, autoInjectable, inject, injectAll }
