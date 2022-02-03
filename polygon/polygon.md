#### https://mumbai.polygonscan.com/
#### https://docs.moralis.io/introduction/readme
#### https://admin.moralis.io/speedyNodes
#### https://faucet.polygon.technology/
#### https://docs.polygonscan.com/v/mumbai-polygonscan/
#### https://docs.polygon.technology/

### polygon gas station usage
#### javascript
/*
fetch('https://gasstaion-mainnet.matic.network')
    .then(response => response.json())
    .then(json => console.log(json))

*/

#### python
/*
import requests
requests.get('https://gasstationmainnet.matic.network').json()
*/
#### cURL
curl https://gasstation-mainnet.matic.network

### polygon gas station response
- gas prices in GWei 
// sageLOW
// standard
// fast
// fastest
- average block time of network in seconds
// blocktime
- last block mined
// blocknumber

## 52:00  // 이부분 잘 안됨 다시 해볼겟
### using polygon sdk
` 
> yarn add @maticnetwork/maticjs
`
/* importing plasma and pos client 
const MaticPlasmaClient =
require("@maticnetwork/maticjs).default();

const {MaticPoSClient} = 
require("@maticnetwork/maticjs");
*/

- initialization of Plasma Client
/*
new MaticPlasmaClient({
    network:<"testnet"||"mainnet">,
    version:<"mumbai"||"v1">,
    parentProvider:<parent-provider>,
    maticProvider:<child-provider>,
    parentDefaultOptions:{from:<userAddress>},
    maticDefaultOptions:{from:<userAddress>},
    rootChain:<rootChainAddress>,
    registry:<registryAddress>,
    depositManager: <depositManagerAddress>,
    withdrawManager:<withdrawManagerAddress>,
    childChain:<childChainAddress>
})
await matic.initialize()
*/

- initialization of PoS Client
/*
new MaticPOSClient({
    network:<"testnet"||"mainnet">,
    version:<"mumbai"||"v1">,
    parentProvider:<parent-provider>,
    maticProvider:<child-provider>,
    parentDefaultOptions:{from:userAddress},
    maticDefaultOptions:{from:userAddress},
    posRootChainManager<parent-chainManagerAddress>,
    posERC20Predicate:<parent-erc20predicate>,
    posERC721Predicate:<parent-erc721Predicate>,
    posERC1155Pedicate:config.post.parent.erc.1155Predicate
})
*/


### Accessing ERC20 and ERC721 APIs



## 1:21:00 Polygon assets Bridge
- metamask configuration
// adding polygon test network
// 메타마스크 설정 - 네트워크 추가
### metamask wallet connect setup
// yarn add @maticnetwork/walletconnect-provider
// yarn add web3
// // loadweb3
window.web3 = new web3(window.ethereum);
await window.ethereum.enable();
/*  matic provider
const maticProvider = new WalletConnectProvider({
    host:MATIC RPC
})
*/

/* Ethereum provider
const ethereumProvider =  new WalletConnectProvider({
    host:ETHEREUM RPC
})
*/
- polygon and georli faucet
- wallet connect provider
- transfer assets using polygon pos and plasma bridges












#### https://kauri.io/#collections/Full%20Stack%20dApp%20Tutorial%20Series/truffle--smart-contract-compilation-and-deploymen/

