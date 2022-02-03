const dotenv= require("dotenv");

const bn = require('bn.js')
const HDWalletProvider = require('@truffle/hdwallet-provider')
//import HDWalletProvider from "@truffle/hdwallet-provider";
dotenv.config();
const config = require('./config')
const Network = require("@maticnetwork/meta/network");
//import MaticPlasmaClient from "@maticnetwork/maticjs";
const MaticPlasmaClient = require('@maticnetwork/maticjs')
const { MaticPOSClient } = require("@maticnetwork/maticjs");
const SCALING_FACTORY = new bn(10).pow(new bn(18))

const privateKey = process.env.privateKey;
const userAddress  = process.env.userAddress;

async function getMaticPlasmaClient(network="testnet",version="mumbai"){
    const networkInstance = new Network(network,version);
    const matic = new MaticPlasmaClient({
        network: network,
        version: version,
        parentProvider: new HDWalletProvider(privateKey, config.parent.rpc),
        maticProvider: new HDWalletProvider(privateKey, config.child.rpc),
        parentDefaultOptions:{from:userAddress},
        maticDefaultOptions:{from:userAddress}
    })
    await matic.initialize()
    return {matic,network:networkInstance}
    //rootChain:config.plasma.rootChainAddress,
    //registry:config.plasma.registryAddress,
    //depositManager:config.plasma.depositManagerAddress,
    //withdrawManager:config.plasma.withdrawManager 
}

const getMaticPOSClient = () => {
    return new MaticPOSClient({
        network:'testnet', // for mainnet change this to mainnet
        version:'mumbai', // for mainnet change this to v1
        parentProvider: new HDWalletProvider(privateKey, config.parent.rpc),
        maticProvider: new HDWalletProvider(privateKey, config.child.rpc),
        parentDefaultOptions:{from:userAddress},
        maticDefaultOptions:{from:userAddress}
    })
}

module.exports = {
    SCALING_FACTORY:SCALING_FACTORY,
    getMaticPlasmaClient:getMaticPlasmaClient,
    getMaticPOSClient:getMaticPOSClient,
    child:config.child,
    plasma:config.plasma,
    pos:config.pos,
    from:config.user1.address,
    privateKey:config.user1.privateKey,
    to:config.user2.address
}