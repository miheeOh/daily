//import {getMaticPlasmaClient,plasma,to} from "./utils.js"
const {getMaticPlasmaClient,plasma,to} = require('./utils')

const amount = '1000000000000000'
const token = plasma.child.erc20;
const recipient = to;
async function execute() {
    const {matic} = await getMaticPlasmaClient()

    await matic
        .transferERC20Tokens(token,recipient,amount,{
            from:"0x90062dDC0f4a576174CC97cd02F77735E0b89e7E"
        })
        .then(result => {
            console.log('hash',result)
        })
}

execute().then(_=>{
    process.exit(0)
})