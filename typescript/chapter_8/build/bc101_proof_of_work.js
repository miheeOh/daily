"use strict";
// bc101.ts와 유사 // 블록 추가시 작업 증명 내용 추가
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class Block {
    constructor(index, previousHash, timestamp, data) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        const { nonce, hash } = this.mine();
        this.nonce = nonce;
        this.hash = hash;
    }
    calculateHash(nonce) {
        const data = this.index + this.previousHash + this.timestamp + this.data + nonce;
        return crypto_1.default.createHash('sha256').update(data).digest('hex');
    }
    mine() {
        let hash;
        let nonce = 0;
        do {
            hash = this.calculateHash(++nonce); // 브루트 포스~ 목적을 달성할때까지 걔속해서 값을 대입하여 계산
        } while (hash.startsWith('0000') === false);
        return { nonce, hash };
    }
}
class Blockchain {
    constructor(msg) {
        this.chain = []; // 블럭을 체인에 담음
        // create the genesis block
        this.chain.push(new Block(0, '0', Date.now(), msg)
        // 제네시스 블럭 생성 후 체인에 추가함.
        );
    }
    get latestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(data) {
        const block = new Block(this.latestBlock.index + 1, this.latestBlock.hash, Date.now(), data);
        this.chain.push(block);
        // 체인에 블럭 추가
    }
}
const blockchain = new Blockchain('test');
blockchain.addBlock('block');
console.log(blockchain);
