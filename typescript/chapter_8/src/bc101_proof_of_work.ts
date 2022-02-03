// bc101.ts와 유사 // 블록 추가시 작업 증명 내용 추가

import crypto from 'crypto'

class Block {
    readonly nonce: number;
    readonly hash: string;

    constructor(
        readonly index: number,
        readonly previousHash: string,
        readonly timestamp: number,
        readonly data: string
    ){
        const {nonce,hash} = this.mine();
        this.nonce = nonce;
        this.hash = hash;
    }
    private calculateHash(nonce:number): string{
        const data = this.index + this.previousHash + this.timestamp + this.data + nonce
        return crypto.createHash('sha256').update(data).digest('hex')
    }

    private mine():{nonce:number, hash:string}{
        let hash: string;
        let nonce = 0;

        do{
            hash = this.calculateHash(++nonce); // 브루트 포스~ 목적을 달성할때까지 걔속해서 값을 대입하여 계산
        }while(hash.startsWith('0000')===false);

        return {nonce,hash}
    }
}

class Blockchain {
    private readonly chain: Block[] = [];  // 블럭을 체인에 담음
    private get latestBlock():Block{
        return this.chain[this.chain.length-1]
    }

    constructor(
        msg: string
    ){
        // create the genesis block
        this.chain.push(
            new Block(0,'0',Date.now(),msg) 
            // 제네시스 블럭 생성 후 체인에 추가함.
        )
    }

    addBlock(data:string):void{
        const block = new Block(
            this.latestBlock.index + 1,
            this.latestBlock.hash,
            Date.now(),
            data
        )
        this.chain.push(block) 
        // 체인에 블럭 추가
    }
}

const blockchain = new Blockchain('test')
blockchain.addBlock('block')
console.log(blockchain)