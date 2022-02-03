import dotenv from 'dotenv'
import axios from 'axios';
import BN from 'bignumber.js'
dotenv.config()

const eoa = '0xbe188D6641E8b680743A4815dFA0f6208038960F'

export const getMaticBalance_res = axios({
    method:"get",
    url:`https://api-testnet.polygonscan.com/api?module=account&action=balance&address=${eoa}&tag=latest&apikey=${process.env.POLYGONSCAN_API_KEY}`,
    responseType:"json",
}).then(function(response){
    if(response.data.message == "OK"){
        console.log(response.data)
        const balanceMatic = new BN(response.data.result).div(new BN(10).pow(new BN(18)));
        console.log(`the balance of ${eoa} is ${balanceMatic} MATIC`)
    }else{
        console.log(response.data.message)
    }
})