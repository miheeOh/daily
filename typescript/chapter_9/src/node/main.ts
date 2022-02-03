 import { Blockchain } from "../lib/bc_transactions";

 (async function main(): Promise<void>{
    console.log('initializing the blockchain, creating the gensesis block');

    const bc = new Blockchain();
    await bc.createGenesisBlock();

    bc.createTransaction({sender:'mihee',recipient:'jin',amount:20})
    bc.createTransaction({sender:'mihee2',recipient:'jin2',amount:30})

    await bc.minePendingTransaction();

    bc.createTransaction({sender:'mihee3',recipient:'jin3',amount:40})
    bc.createTransaction({sender:'mihee4',recipient:'jin4',amount:50})

    await bc.minePendingTransaction();

    console.log(JSON.stringify(bc,null,2))
 })()