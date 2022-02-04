require('dotenv').config();

const express = require('express');
const app = express();

const Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');
const web3 = new Web3(process.env.provider);

const account2 = '0xF0Ec8078993e44d19475A7Db4696cE0A49f485C4';
const account1 = '0xc00D60dE28C938e71C5bf59d22FF8a67475f1600';

const privateKey2 = Buffer.from('1ed3007dfe24c22c129c3c104280f856cb23bba253b77ed3b26cad452d73e668','hex');
const privateKey1 = Buffer.from('c4b908464e6f35717f2483be50b67993759c00a9035f2919a7b4ff3ba8e16fa2','hex');

// 트랜잭션 발생
// 참고 : https://web3js.readthedocs.io/en/v1.7.0/web3-eth.html#gettransaction
web3.eth.getTransactionCount(account1, (err, txCount) => {
    const txObject = {
         nonce: web3.utils.toHex(txCount),
         to: account2,
         value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
         gasLimit: web3.utils.toHex(21000),
         gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }
    const tx = new Tx(txObject)
    // const tx = new Tx(txObject,{chain:mainnet})
    // 로컬이 아닌 mainnet이나 테스트넷에서 실행시에는 위와 같이 어떤 chain에 연결되는지 명시해줌.
    tx.sign(privateKey1)
    const serializedTransaction = tx.serialize()
    const raw = '0x' + serializedTransaction.toString('hex')
    // 이미 서명이 완료된 트랜잭션에 대해 트랜잭션이 일어남  
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
         //console.log('txHash: ', txHash)
         //console.log(err)
    })
})


// 계정의 잔액 알려줌
app.get('/getbalance',(req,res) => {
    web3.eth.getBalance(account1, (err,wei) => {
        let balance = web3.utils.fromWei(wei,'ether');
        console.log('balance',balance)
        res.send(balance)
    })
})


// 스마트 컨트랙트 관련
// app.get('/contract',(req,res) => {
//     try{
//         const abi = require('../../dapp/tutorial1/decentragram/src/abis/Migrations.json');
//         const contract = new web3.eth.Contract(abi,account1)
        
        
//     }catch(e){
//         console.log(e)
//     }
// })

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