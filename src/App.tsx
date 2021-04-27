import './App.css';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import { useEffect } from 'react';
import todoListJson from '../src/TodoList.json';

function App() {
  const win: any =  window;
  let account;
  const contracts: any = {};
  let todoList: any;

  
  let web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
  let web3Provider: any;

  const loadWeb3 = async () => {
    if (typeof web3 !== 'undefined') {
      web3Provider = web3.currentProvider;
      // web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }

    if (win.ethereum) {
      win.web3 = new Web3(win.ethereum)
      try {
        // Request account access if needed
        await win.ethereum.enable()
        // Acccounts now exposed
        // web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        console.log('err', error)
        // User denied account access...
      }
    } else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  const loadAccount = async () => {
    account = await web3.eth.getAccounts();
    console.log('Acc', account);
  }


  const loadContract = async () => {
    // Create a JavaScript version of the smart contract
    // let todoList = await $.getJSON('TodoList.json')
    contracts.TodoList = TruffleContract(todoListJson)
    contracts.TodoList.setProvider(web3Provider)

    // Hydrate the smart contract with values from the blockchain
    todoList = await contracts.TodoList.deployed();
    console.log('todos', todoList);


  }

  const printResults = async () => {
    const task = await todoList.tasks(0);
    console.log(task);
  }

  
 

  const init = async () => {
    await loadWeb3();
    await loadAccount();
    await loadContract();
    await printResults();
  }


  useEffect(() => {
    init();
  }, []);
  
  










  return (
    <div className="App">
      <h3>Web3 App</h3>
    </div>
  );
}

export default App;
