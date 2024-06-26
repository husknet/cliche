import { chain, configureChains, createClient } from '@wagmi/core'
import { ClientCtrl, ConfigCtrl } from '@web3modal/core'
import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum'

// 1. Define constants
const projectId = 'c05e035e823a4769b62ae15c1cbe2f02'
const chains = [chain.mainnet]

// 2. Configure wagmi client
const { provider } = configureChains(chains, [walletConnectProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: 'web3Modal', chains }),
  provider
})

// 3. Configure ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains)

// 4. Configure modal and pass ethereum client to it
ConfigCtrl.setConfig({
  projectId,
  theme: 'dark',
  accentColor: 'default'
})
ClientCtrl.setEthereumClient(ethereumClient, chains)

// 5. Import ui package after all configuration has been completed
async function loadUi() {
  await import('@web3modal/ui')
}

loadUi()

/**
 * 6. Use ModalCtrl and wagmiClient in your app i.e.
 *
 * ModalCtrl.open
 *
 * wagmiClient.getAccount
 * wagmiClient.watchAccount
 *
 * etc ...
 */