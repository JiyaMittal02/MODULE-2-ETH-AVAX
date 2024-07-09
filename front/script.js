let provider;
let signer;
let contract;

// Replace with your contract address and ABI
const contractAddress = '0x002124DC1e6466aF7EF9302DD1178E79b3f98280'; // Update with your actual contract address

const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			}
		],
		"name": "addTask",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "completeTask",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTasks",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isCompleted",
						"type": "bool"
					}
				],
				"internalType": "struct TaskManager.Task[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tasks",
		"outputs": [
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isCompleted",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// Function to connect to the wallet
async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log(`Connected account: ${accounts[0]}`);

            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, contractABI, signer);

            alert('Wallet connected');
        } catch (error) {
            console.error('Failed to connect wallet:', error);
            alert('Failed to connect wallet. Check console for more details.');
        }
    } else {
        alert('No Ethereum browser extension detected. Install MetaMask.');
    }
}

document.getElementById('connectWalletButton').addEventListener('click', connectWallet);

async function addTask(event) {
    event.preventDefault();

    if (!contract) {
        alert('Connect your wallet first to add a task.');
        return;
    }

    const description = document.getElementById('taskDescription').value;

    try {
        await contract.addTask(description);
        alert('Task added successfully!');
        getTasks();
    } catch (error) {
        console.error('Error adding task:', error);
        alert('Error adding task. Check console for details.');
    }
}

async function getTasks() {
    try {
        if (!contract) {
            alert('Connect your wallet first to fetch tasks.');
            return;
        }

        const tasks = await contract.getTasks();
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${task.description} - ${task.isCompleted ? 'Completed' : 'Pending'} <button onclick="completeTask(${index})">Complete</button>`;
            taskList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error getting tasks:', error);
        alert('Error getting tasks. Check console for details.');
    }
}

async function completeTask(index) {
    try {
        if (!contract) {
            alert('Connect your wallet first to complete a task.');
            return;
        }

        await contract.completeTask(index);
        alert('Task completed successfully!');
        getTasks();
    } catch (error) {
        console.error('Error completing task:', error);
        alert('Error completing task. Check console for details.');
    }
}

document.getElementById('taskForm').addEventListener('submit', addTask);
document.addEventListener('DOMContentLoaded', getTasks);
