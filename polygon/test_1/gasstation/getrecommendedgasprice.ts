import axios from 'axios';

export const recommend_price = axios({
    method:"get",
    url:`https://gasstation-mainnet.matic.network`,
    responseType:"json"
}).then(function(response){
    if(response.status == 200){
        console.log(`the recommended gas price is : \n`,response.data);
        
    }
})