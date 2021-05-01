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
    if (win.web3 !== undefined) {
      win.web3 = new Web3(win.web3.currentProvider);
      console.log('Web3 OK')
    } else {
      console.log('Not fount')
    }

    const accounts = await win.ethereum.request({ method: 'eth_requestAccounts' });
    console.log('account', accounts[0]);

    win.web3.eth.defaultAccount = accounts[0];

    // console.log('default account', win.web3.eth.defaultAccount);
    // 0xE741731a0aaf841c031786Cac7A169e9896C9168
    // 0xE741731a0aaf841c031786Cac7A169e9896C9168
    const contractAddress = '0x936Dc62aC27Da08D3EAca56995Dcd43705CF6238';
    const contractAbi = [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "num",
            "type": "uint256"
          }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];

    // const checksomeaddr = win.web3.utils.toChecksumAddress('0x188bBa4d635317E7530B52f628cb1a6cC33bA7B4')

    //0x188bBa4d635317E7530B52f628cb1a6cC33bA7B4
    const contract = new win.web3.eth.Contract(contractAbi, contractAddress);
    // await contract.methods.store(550).send({from :'0xC3248557599d01c9029afAaeba3268f20dEebd08'});
    //  await contract.methods.retrieve().call();

    try{
      await contract.methods.store(550).send({from :'0x38b84f33B8646305473FdCe422ef6Bb53D9350af'});
      // await contract.methods.store(22).call();
      console.log('Done');
    } catch(e){
      console.log(e)
    }
    //  const name = await contract.methods.retrieve().call();
    // contract.methods.retrieve().send({
    //   from : '0x38b84f33B8646305473FdCe422ef6Bb53D9350af',
    //   to: '0xE741731a0aaf841c031786Cac7A169e9896C9168'
    // }).on('recei', (re: any) => {
    //   console.log('res', re)
    // })
 

    // console.log(name);
  }


  const loadAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    const acc = accounts[0];
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
    const taskCount: BigInt = await deployedTodoList.taskCount();
    // await TodoList.createTask('New from FE');
    console.log('Task', task);
    console.log('Count:', taskCount.toString());
  }

  const init = async () => {
    await loadWeb3();
    // await loadAccount();
    // await loadContract();
    // await printResults();
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
      <button onClick={loadWeb3}>loadWeb3</button>
      <button onClick={addTask}>Add Task</button>
      <button onClick={addTask2}>Add Task 2</button>
    </div>
  );
}

export default App;
