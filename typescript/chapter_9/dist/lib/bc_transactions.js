var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { sha256 } from './universal_sha256';
export class Block {
    constructor(previousHash, timestamp, transaction) {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.nonce = 0;
        this.hash = '';
    }
    mine() {
        return __awaiter(this, void 0, void 0, function* () {
            do {
                this.hash = yield this.calculateHash(++this.nonce);
            } while (this.hash.startsWith('0000') === false);
        });
    }
    calculateHash(nonce) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.previousHash + this.timestamp + JSON.stringify(this.transaction) + nonce;
            return sha256(data);
        });
    }
}
export class Blockchain {
    constructor() {
        this._chain = [];
        this._pendingTransactions = [];
    }
    // 접근제어자가 private인 경우에는 _name 이와 같이 하는 것이 관행
    // private이 접근제어자일 때 변수를 수정하기 위해서는 get을 이용하여 가능.
    get latestBlock() {
        return this._chain[this._chain.length - 1];
    }
    get chain() {
        return [...this._chain];
    }
    get pendingTransactions() {
        return [...this._pendingTransactions];
    }
    createGenesisBlock() {
        return __awaiter(this, void 0, void 0, function* () {
            const genesisBlock = new Block('0', Date.now(), []);
            yield genesisBlock.mine();
            this._chain.push(genesisBlock);
        });
    }
    createTransaction(transaction) {
        this._pendingTransactions.push(transaction);
    }
    minePendingTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            const block = new Block(this.latestBlock.hash, Date.now(), this._pendingTransactions);
            yield block.mine();
            this._chain.push(block);
            this._pendingTransactions = [];
        });
    }
}
