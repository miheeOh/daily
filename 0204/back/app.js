require('dotenv').config();

const express = require('express');
const app = express();

const Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');
const web3 = new Web3(process.env.provider1);


const account1 = '0x83C9beda847e2982A31E55Ea44f26fa8A3ce4426';
const account2 = '0xF16D4828003616b3C5d8beb62012d0db0788Bac1';

const privateKey1 = Buffer.from('b4a916415bd202d01c69ff771df05107937f85bac84bdf98ccf60ac3e562ae93','hex');
const privateKey2 = Buffer.from('28bb12d7fd48046fab937b7204ce52638cf365860931a0383b952e79beb42cc3','hex');



// 트랜잭션 발생
// 참고 : https://web3js.readthedocs.io/en/v1.7.0/web3-eth.html#gettransaction
web3.eth.getTransactionCount(account1, (err, txCount) => {
    // smart contract data
    // const data = ''

   // const data = '0x606060405260405160208061073e833981016040528080519060200190919050505b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550600160016000506000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600001600050819055508060ff166002600050818154818355818115116100fc578183600052602060002091820191016100fb91906100d9565b808211156100f75760006000820160005060009055506001016100d9565b5090565b5b505050505b5061062e806101106000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480635c19a95c1461005d578063609ff1bd1461007a5780639e7b8d61146100a5578063b3f98adc146100c257610058565b610002565b346100025761007860048080359060200190919050506100df565b005b346100025761008c60048050506103db565b604051808260ff16815260200191505060405180910390f35b34610002576100c06004808035906020019091905050610472565b005b34610002576100dd6004808035906020019091905050610554565b005b60006000600160005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005091508160010160009054906101000a900460ff1615610130576103d6565b5b600073ffffffffffffffffffffffffffffffffffffffff16600160005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060010160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415801561023e57503373ffffffffffffffffffffffffffffffffffffffff16600160005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060010160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614155b1561029f57600160005060008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060010160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1692508250610131565b3373ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156102d8576103d6565b60018260010160006101000a81548160ff02191690830217905550828260010160026101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550600160005060008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005090508060010160009054906101000a900460ff16156103b957816000016000505460026000508260010160019054906101000a900460ff1660ff16815481101561000257906000526020600020900160005b506000016000828282505401925050819055506103d5565b8160000160005054816000016000828282505401925050819055505b5b505050565b60006000600060009150600090505b6002600050805490508160ff16101561046c578160026000508260ff16815481101561000257906000526020600020900160005b5060000160005054111561045e5760026000508160ff16815481101561000257906000526020600020900160005b50600001600050549150815080925082505b5b80806001019150506103ea565b5b505090565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614158061050b5750600160005060008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060010160009054906101000a900460ff165b1561051557610551565b6001600160005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600001600050819055505b50565b6000600160005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005090508060010160009054906101000a900460ff16806105af57506002600050805490508260ff1610155b156105b95761062a565b60018160010160006101000a81548160ff02191690830217905550818160010160016101000a81548160ff02191690830217905550806000016000505460026000508360ff16815481101561000257906000526020600020900160005b506000016000828282505401925050819055505b505056'

    // create transaction object
    const txObject = {
         nonce: web3.utils.toHex(txCount),
         to: account2,
         value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
         gasLimit: web3.utils.toHex(21000),
         gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
         //data:data
    }
    // sign the transaction
    const tx = new Tx(txObject)
    // const tx = new Tx(txObject,{chain:mainnet})
    // 로컬이 아닌 mainnet이나 테스트넷에서 실행시에는 위와 같이 어떤 chain에 연결되는지 명시해줌.
    tx.sign(privateKey1)
    const serializedTransaction = tx.serialize()
    const raw = '0x' + serializedTransaction.toString('hex')
    // 이미 서명이 완료된 트랜잭션에 대해 트랜잭션이 일어남  
    // broadcast the transaction
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
         console.log('txHash: ', txHash)
         // use this txhash to find the contract on etherscan
         //console.log(err)
    })
})
// web3.eth.sendTransaction({from:account1,to:account2,value:web3.utils.toWei('1','ether')})



// 계정의 잔액 알려줌
app.get('/getbalance',(req,res) => {
    web3.eth.getBalance(account1, (err,wei) => {
        let balance = web3.utils.fromWei(wei,'ether');
        console.log('balance',balance)
        res.send(balance)
    })
})


//스마트 컨트랙트 관련
// 이부분은 다시 체크해봐야함....
app.get('/contract',(req,res) => {
    try{
        const address = "0x242E7a6E9f184D0EFe9E6B8f4f6824d770F3FE72"
        const abi = require('../../web3/smartcontract/build/contracts/MyToken.json').abi;
        const contract = new web3.eth.Contract(abi,address)
        console.log(contract)
        console.log(contract.methods.name().call())    
    }catch(e){
        console.log(e)
    }
})
// contract.methods.mintingFinished()
// contract.methods.balanceOf()
// contract.methods.balanceOf(accountAddress).call((err,result) => {console.log(result)})
// contract.methods.totalSupply
// const tokenContract = web3.eth.Contract(contractABI,contractAddress)
    /*
    
    const dapptoken = dapptokenContract.new({
        from:web3.eth.accounts[0],
        data:'',
        gas:'10000000',
    }, function (e, contract) {
        console.log(e, contract);
        if(typeof contract.address !== 'undefined'){
            console.log('contract mined: address:'+contract.address)
        }
    })
    */




// 현재 계정 보여줌
app.get('/getaccounts',(req,res) => {
    try{
        web3.eth.getAccounts().then( accounts => res.send(accounts))
    }catch(e){
        console.log(e)
    }
})

// 마지막 블럭번호 알려줌
app.get('/getBlockNumber', async (req,res) => {
    try{
        web3.eth.getBlockNumber().then(console.log)
        res.send('콘솔로만 찍힘 이상하게 res.send로 보내면 에러')
    }catch(e){
        console.log(e)
    }
})

// 가스비용 알려줌
app.get('/gasPrice',(req,res)=>{
    try{
        web3.eth.getGasPrice().then(gas => res.send(gas))
    }catch(e){
        console.log(e)
    }
})

// block 정보 알려줌 
app.get('/getblock',(req,res) => {
    try{
        //web3.eth.getBlock(blockhash or blocknumber).then(res=>console.log('res',res))
        web3.eth.getBlock(0).then(block => res.send(block))
    }catch(e){
        console.log(e)
    }
})

// 해당 트랜잭션에 대한 정보 제공
app.get('/getTransaction',(req,res)=>{
    //web3.eth.getTransaction('txhash').then(console.log)
    web3.eth.getTransaction('0x5e7921bc2f1b05dd689c8d02c5259ed12fe6d897878a6aef1819f19f6df6b821').then(txhashres => res.send(txhashres))
    // 대기중인 트랜잭션에 대한 정보 제공
    // web3.eth.getPendingTransactions().then(console.log)
})

// return the receipt of a transaction by transaction hash
app.get('/getTransactionReceipt',(req,res)=>{
    try{
        web3.eth.getTransactionReceipt('0x5e7921bc2f1b05dd689c8d02c5259ed12fe6d897878a6aef1819f19f6df6b821').then(receipt => res.send(receipt))
    }catch(e){
        console.log(e)
    }
})

// eth 전송
app.get('/sendTransaction',(req,res) => {
    try{
        web3.eth.sendTransaction({
            from:account1,
            to:account2,
            value:'1000000000000000000'
        })
        .on('transactionHash',hash => {
            console.log(hash)
        })
        .on('sent', receipt => {
            res.send(receipt)
        }) 
        // sending / sent / transactionHash / receipt /confirmation / error / 
         
        // web3.eth.sendTransaction({
        //     from:account1,
        //     to:account2,
        //     value:'1000000000000000000'
        // }).then(receipt => console.log(receipt))

    }catch(e){
        console.log(e)
    }
})

// web3.eth.personal()

const web32 = new Web3(process.env.provider2);
console.log(web32.eth.accounts.create())






















//web3.eth.isSyncing().then(res=>console.log('issyncing',res))
//console.log('blocktimeout',web3.eth.transactionBlockTimeout)



// 계정 만들어주는 함수
//web3.eth.accounts.create()
// 현재 계정 보여주는 함수 ===========================
//web3.eth.getAccounts().then(console.log)
// chain-id 알아내는 함수 ===========================
// web3.eth.net.getId().then(console.log)
// chain-name 알아내는 함수 =========================
//web3.eth.net.getNetworkType().then(console.log)


app.listen(3000,()=>{
    console.log('server start')
})

