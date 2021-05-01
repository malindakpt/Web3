import './App.css';
import Web3 from 'web3';
import { useCallback, useEffect, useState } from 'react';
import { contractAbi, contractAddress } from './ABI';

const win: any = window;

let contract: any;

function App() {

  const [count, setCount] = useState(0);

  const loadWeb3 = async () => {
    if (win.web3 !== undefined) {
      win.web3 = new Web3(win.web3.currentProvider);
      console.log('Web3 OK');
    } else {
      console.log('Not fount');
    }

    const accounts = await win.ethereum.request({ method: 'eth_requestAccounts' });
    console.log('account', accounts[0]);

    win.web3.eth.defaultAccount = accounts[0];

    contract = new win.web3.eth.Contract(contractAbi, contractAddress);
  }

  const readData = async () => {
    try{
      const value = await contract.methods.retrieve().call();
      console.log('Read', value);
    } catch(e){
      console.log(e)
    }
  }

  const writeData = async () => {
    try{      
      await contract.methods.store(count).send({from :'0x38b84f33B8646305473FdCe422ef6Bb53D9350af'});
      console.log('Wrote', count);
      setCount(count+1);
    } catch(e){
      console.log(e)
    }
  }

  const init = useCallback( async () => {
    await loadWeb3(); 
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div className="App">
      <h3>Web3 App</h3> 
      <button onClick={writeData}>Write</button>
      <button onClick={readData}>Read</button> 
    </div>
  );
}

export default App;
