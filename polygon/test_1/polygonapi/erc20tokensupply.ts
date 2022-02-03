import dotenv from 'dotenv'
import axios from 'axios';
import BigNumber from 'bignumber.js';
dotenv.config()

const contractAddress = '0xf0130374399CF4787079Cd807f6b0e94aA60dD1C'

export const erc20_res = axios({
    method:"get",
    url:`https://api-testnet.polygonscan.com/api?module=stats&action=tokensupply&contractaddress=${contractAddress}&apikey=${process.env.POLYGONSCAN_API_KEY}`,
    responseType:"json"
}).then(function (response){
    console.log(response.data)
    if(response.data.message == "OK") {
        const balanceInUSDC = new BigNumber(response.data.result).div(new BigNumber(10).pow(new BigNumber(6)));
        console.log(
            `ths token supply of contract ${contractAddress} is ${balanceInUSDC} USDC`
        )
    }
})