import './App.global.css'
import styles from './App.module.css'

import { Navigation } from './Components/Navigation'
import { Display } from './Components/Display'

import { MetaMaskContextProvider } from './Hooks/useMetaMask'

export const App = () => {

  return (
    <MetaMaskContextProvider>
      <div className={styles.appContainer}>
        <Navigation />
        <Display />
      </div>
    </MetaMaskContextProvider>
  )
}
export default App