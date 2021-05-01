import './App.css';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract'
import { useCallback, useEffect, useState } from 'react';
import { contractAbi, contractAddress } from './ABI';

let contract: Contract;

function App() {

  const [count, setCount] = useState(0);
  
  const loadWeb3 = async () => { 
    const web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');
 
    contract = new web3.eth.Contract(contractAbi, contractAddress);
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
