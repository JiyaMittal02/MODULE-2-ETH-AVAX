

# Task Manager DApp

A basic Ethereum decentralized application for managing tasks on the blockchain. Users can add tasks, view the list of tasks, and mark tasks as completed.

### Prerequisites

- Node.js (for package management)
- Remix IDE (for contract development to get your ABI and contract address)
- MetaMask (or other Ethereum wallet)

### Installing

1. Install the dependencies:
   ```bash
   npm install
   ```

### Compiling and Deploying the Contract

1. Open the Solidity contract (`TaskManager.sol`) in Remix IDE or your preferred development environment.

2. Compile the Solidity contract using Remix IDE.

3. Deploy the compiled contract to your preferred Ethereum network (local, testnet, or mainnet) using MetaMask. You will get the contract address and ABI.

### Frontend

1. Create `index.html`, `style.css`, and `script.js` files for the frontend.

2. In `script.js`, add your deployed ABI and contract address, and set up the provider, signer, and contract interaction.

### Usage

1. Open `index.html` in your web browser.

2. Connect your MetaMask wallet to the appropriate Ethereum network.

3. Use the form to add tasks by entering the task description.

4. View existing tasks displayed on the page.

5. Mark tasks as completed.

### Example Code

Below is an example of how to interact with the contract using `script.js`:

```javascript
// Function to connect to the wallet
async function connectWallet() {
    if (window.ethereum) {
        try {
            // Request account access if needed
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log(`Connected account: ${accounts[0]}`);

            // Initialize ethers provider and signer
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();

            // Create a connection to the smart contract
            contract = new ethers.Contract(contractAddress, contractABI, signer);

            alert('Wallet connected');
        } catch (error) {
            console.error('Failed to connect wallet:', error);
            alert('Failed to connect wallet. Check the console for more details.');
        }
    } else {
        alert('No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.');
    }
}

// Add event listener to connect wallet button
document.getElementById('connectWalletButton').addEventListener('click', connectWallet);
```

### License

This project is licensed under the MIT License.

### Author

Jiya Mittal
