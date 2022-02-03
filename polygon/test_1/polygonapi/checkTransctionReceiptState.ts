import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

const txHash = '0xb72d019ead10ad9e112624abb040049fbb9dbe550816fe7957f2669fc0231a5b';
export const txHash_res = axios({
    method:"get",
    url:`https://api-testnet.polygonscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${process.env.POLYGONSCAN_API_KEY}`,
    responseType:"json"
}).then(function(response){
    if(response.data.message == "OK"){
        console.log(
            `the transaction receipt status of ${txHash} is ${response.data.result.status == 1 ? 'success' : 'fail'}`
        )
    }
})