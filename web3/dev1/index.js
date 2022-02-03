const Web3 = require('web3');
let web3 = new Web3.providers.HttpProvider('https://ropsten.infura.io')


console.log(web3.eth.getAccounts())