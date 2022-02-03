import dotenv from 'dotenv'
import axios from 'axios';
dotenv.config()


console.log(process.env.POLYGONSCAN_API_KEY)
const timestamp = 1601510400

export const timestamp_res = axios({
    method:"get",
    url:`https://api-testnet.polygonscan.com/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${process.env.POLYGONSCAN_API_KEY}`,
    responseType:"json",
}).then(function(response){
    if(response.data.message == "OK"){
        console.log(
            `the block number at timestamp ${timestamp} is ${response.data.result}`
        )
    }else{
        console.log(response.data.message)
    }
})