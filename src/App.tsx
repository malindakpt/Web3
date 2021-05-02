import './App.css';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract'
import { useCallback, useEffect, useState } from 'react';
import { contractAbi, contractAddress } from './ABI';

let web3: Web3;
let contract: Contract;

function App() {

  const [count, setCount] = useState(1);
  
  const loadWeb3 = async () => { 
    web3 = new Web3(Web3.givenProvider || 'HTTP://127.0.0.1:7545');
 
    contract = new web3.eth.Contract(contractAbi, contractAddress);

    const blockNumber = await web3.eth.getBlockNumber();
    console.log('Block No',blockNumber);
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
      const accounts =  await web3.eth.getAccounts();  
      await contract.methods.store(count).send({from : accounts[0]});
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
