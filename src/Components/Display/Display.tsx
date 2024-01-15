import { useMetaMask } from '../../Hooks/useMetaMask'
import { formatChainAsNum } from '../../utils/index'
import styles from './Display.module.css'
import { useState } from 'react'
import { config }from '../../config'
import { ethers, Contract } from "ethers"
export const Display = () => {

  const { wallet } = useMetaMask()
  const [num,setNum]=useState(0);
  const [fetchNum,setFetchNum]=useState(0);
  const [fetchMapNum,setFetchMapNum]=useState(0);
  const [inputAddress,setInputaddress]=useState("");
  const [fetchAddress,setFetchaddress]=useState("");
  const [mapNum,setMapNum]=useState(0);
  const address=config.address
  const abi=config.abi
  
  const fetchValForm = async (e: any) => {
    e.preventDefault();
    const provider = new ethers.BrowserProvider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer =await provider.getSigner()
    const contract = new Contract(address, abi, signer)
    const tx=await contract.num()
    const tx1=Number(tx)
    setFetchNum(tx1)
  };

  const fetchMapForm = async (e: any) => {
    e.preventDefault();
    const provider = new ethers.BrowserProvider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer =await provider.getSigner()
    const contract = new Contract(address, abi, signer)
    const tx=await contract.getMap(fetchAddress)
    const tx1=Number(tx)
    setFetchMapNum(tx1)
  };

  const submitValForm = async (e: any) => {
    e.preventDefault();
    const provider = new ethers.BrowserProvider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer =await provider.getSigner()

    const contract = new Contract(address, abi, signer)
    const tx=await contract.set(num)
    
  };

  const submitMapForm = async (e: any) => {
    e.preventDefault();
    const provider = new ethers.BrowserProvider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer =await provider.getSigner()
    const contract = new Contract(address, abi, signer)
    const tx=await contract.setMap(inputAddress,mapNum)
  };

  return (
    <div className={styles.display}>
      {wallet.accounts.length > 0 &&
        <>
          <div>Wallet Accounts: {wallet.accounts[0]}</div>
          <div>Wallet Balance: {wallet.balance}</div>
          <div>Hex ChainId: {wallet.chainId}</div>
          <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>

          <form onSubmit={submitValForm}>
        <h4>Enter a number</h4>
        <div>
          <input
            style={{ marginLeft: '1vw' }}
            value={num}
            onChange={(e) => setNum(+e.target.value)}
          />
          <button style={{ display: 'block', marginTop: '1vh' }}>Enter</button>
        </div>
      </form>

      <form onSubmit={submitMapForm}>
        <h4>Enter an address</h4>
        <div>
          <input
            style={{ marginLeft: '1vw' }}
            value={inputAddress}
            onChange={(e) => setInputaddress(e.target.value)}
          />
          <h4>Enter an value</h4>
        
          <input
            style={{ marginLeft: '1vw' }}
            value={mapNum}
            onChange={(e) => setMapNum(+e.target.value)}
          />
          <button style={{ display: 'block', marginTop: '1vh' }}>Enter</button>
        </div>
      </form>

      <form onSubmit={fetchValForm}>
        <div>
          <button style={{ display: 'block', marginTop: '1vh' }}>Fetch Num</button>
          <label htmlFor="fetch">{fetchNum}</label>
        </div>
      </form>

      <form onSubmit={fetchMapForm}>
        <h4>Enter an address</h4>
        <div>
          <input
            style={{ marginLeft: '1vw' }}
            value={fetchAddress}
            onChange={(e) => setFetchaddress(e.target.value)}
          />
          <h4>{fetchMapNum}</h4>
          <button style={{ display: 'block', marginTop: '1vh' }}>Enter</button>
        </div>
      </form>
        </>

      }
    </div>
  )
}
export default Display;