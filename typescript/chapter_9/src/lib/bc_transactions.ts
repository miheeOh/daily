
import {sha256} from './universal_sha256';

export interface Transaction {
    readonly sender: string;
    readonly recipient: string;
    readonly amount: number;
}

export class Block {
    nonce: number = 0;
    hash: string = ''

    constructor (
        readonly previousHash: string,
        readonly timestamp: number,
        readonly transaction: Transaction[],
    ){}
    async mine(): Promise<void> {
        do {
            this.hash = await this.calculateHash(++this.nonce);
        } while (this.hash.startsWith('0000') === false)
    }

    private async calculateHash(nonce:number): Promise<string>{
        const data = this.previousHash + this.timestamp + JSON.stringify(this.transaction) + nonce
        return sha256(data)
    }
}

export class Blockchain {
    private readonly _chain: Block[] = [];
    private _pendingTransactions: Transaction[] = []
    // 접근제어자가 private인 경우에는 _name 이와 같이 하는 것이 관행
    // private이 접근제어자일 때 변수를 수정하기 위해서는 get을 이용하여 가능.

    private get latestBlock():Block {
        return this._chain[this._chain.length - 1]
    }

    get chain():Block[] {
        return [...this._chain]
    }

    get pendingTransactions():Transaction[]{
        return [...this._pendingTransactions];
    }

    async createGenesisBlock(): Promise<void> {
        const genesisBlock = new Block('0',Date.now(),[]);
        await genesisBlock.mine();
        this._chain.push(genesisBlock);
    }

    createTransaction(transaction: Transaction):void {
        this._pendingTransactions.push(transaction)
    }

    async minePendingTransaction(): Promise<void> {
        const block = new Block(this.latestBlock.hash, Date.now(),this._pendingTransactions)
        await block.mine()
        this._chain.push(block)
        this._pendingTransactions = []
    }
}