const Web3 = require('web3');

const providerUrl = 'https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY';
const web3 = new Web3(providerUrl);

const contractAddress = '0xYourContractAddress';
const contractAbi = [
  // Include your contract ABI here
  // Example:
  // { "constant": false, "inputs": [{"name": "value","type": "uint256"}], "name": "buyTokens", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }
];

const userWalletAddress = '0xYourWalletAddress';  // Replace with the user's wallet address
const amountToSendInEther = 1;  // Replace with the amount of Ether to send

const contract = new web3.eth.Contract(contractAbi, contractAddress);

async function buyTokens() {
  try {
    const gasPrice = await web3.eth.getGasPrice();
    const gasEstimate = await contract.methods.buyTokens().estimateGas({ from: userWalletAddress, value: web3.utils.toWei(amountToSendInEther.toString(), 'ether') });

    const result = await contract.methods.buyTokens().send({
      from: userWalletAddress,
      value: web3.utils.toWei(amountToSendInEther.toString(), 'ether'),
      gasPrice: gasPrice,
      gas: gasEstimate * 2  // You can adjust the gas limit as needed
    });

    console.log('Transaction Hash:', result.transactionHash);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

buyTokens();
