require("dotenv").config();
const axios = require("axios").default;

const txHash = '0xb72d019ead10ad9e112624abb040049fbb9dbe550816fe7957f2669fc0231a5b';
axios({
    method:"get",
    //url: `https://api.polygonscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${process.env.POLYGONSCAN_API_KEY}`,
    url:`https://api-testnet.polygonscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${process.env.POLYGONSCAN_API_KEY}`,
    responseType:"json",
}).then(function(response) {
    if(response.data.message == "OK") {
        console.log(response.data)
        console.log(
            `The transaction receipt status of ${txHash} is ${response.data.result.status == 1 ? `success` : `fail`}`
        )
    }
})