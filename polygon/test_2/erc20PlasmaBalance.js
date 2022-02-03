import bn from 'bignumber.js';
import {getMaticPlasmaClient,from,to,plasma,SCALING_FACTORY} from './utils.js'

const execute = async () => {
    const {matic} = await getMaticPlasmaClient();
    const balance = await matic.balance0fERC20(from,plasma.child.erc20,{});
    const balanceInToken =  new bn(balance).div(SCALING_FACTORY)
    console.log(`balance of ${from} on plasma bridge is ${balanceInToken} TST`)
}

execute().then(_ => {
    process.exit(0)
})