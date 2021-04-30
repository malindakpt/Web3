import './App.css';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import { useEffect } from 'react';
import todoListJson from './contracts/TodoList.json';

let TodoList: any;
let deployedTodoList: any;
const win: any = window;
let web3: any;

function App() {
  // const [deployedTodoList, setDeployedTodoList] = useState<any>();
  // const [todoList, setTodoList] = useState<any>();

  const loadWeb3 = async () => {
    web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
    // await web3.ethereum.enable()
  }
 

  const loadAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    const acc= accounts[0];
    web3.eth.defaultAccount = acc;
    console.log('Acc', acc);
  }

  const loadContract = async () => {
    // Create a JavaScript version of the smart contract
    // let todoList = await $.getJSON('TodoList.json')
    // const contTodo = TruffleContract(todoListJson);
    // contTodo.setProvider(Web3.givenProvider)

    

     TodoList = TruffleContract(todoListJson)
     TodoList.setProvider(Web3.givenProvider)

    // Hydrate the smart contract with values from the blockchain
     deployedTodoList = await TodoList.deployed();
 
   
    
    // console.log('todos', deployedTodoList);
  }

  const addTask = async () => {
    await deployedTodoList.createTask('New from FE');
  }

  const addTask2 = async () => {
    await deployedTodoList.createTask2();
  }

  const printResults = async () => {
    const task = await deployedTodoList.tasks(2);
    const taskCount: BigInt =  await deployedTodoList.taskCount();
    // await TodoList.createTask('New from FE');
    console.log('Task', task);
    console.log('Count:',taskCount.toString());
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
      <div>
        {/* Task Count: {taskCount.toNumber()} */}
      </div>
      <button onClick={printResults}>Print</button>
      <button onClick={addTask}>Add Task</button>
      <button onClick={addTask2}>Add Task 2</button>
    </div>
  );
}

export default App;
