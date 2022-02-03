import crypto from 'crypto'

class Block {
    readonly hash: string  // 블록해시값

    constructor (
        readonly index: number,
        readonly previousHash: string,
        readonly timestamp: number,
        readonly data: string
    ){
        this.hash = this.calculateHash()
    }

    private calculateHash():string{
        const data = this.index + this.previousHash + this.timestamp + this.data;
        return crypto
                .createHash('sha256')  //hash의 인스턴스 생성
                .update(data)   // 해시객체에 해시값을 업데이트
                .digest('hex')   // 해시값을 16진수로 변환
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

console.log('creating the blockchain with the genesis block');
const blockchain = new Blockchain('genesisblock');

console.log('mining block 2..');
blockchain.addBlock('block2');
console.log('mining block 3...')
blockchain.addBlock('block3')

console.log(JSON.stringify(blockchain,null,2))
//JSON.stringify(value, replacer, space)
// value만 필수
// replacer 함수 또는 배열 가능, 이 값이 null이거나 비어있으면, 객체의 모든 속성들이  JSON문자열 결과에 포함됨.
// space 입력한 숫자만큼 공백



// 제네시스 블럭을 제외하고 이전의 블록의 해시값이 현재 블록에서 이전블럭의해시값이 된다.
// {
//     "chain": [
//       {
//         "index": 0,
//         "previousHash": "0",
//         "timestamp": 1642662640371,
//         "data": "genesisblock",
//         "hash": "1705860a0e3623cce10c5daa70c3c9b918658873d742fe87c612088fea7113e7"
//       },
//       {
//         "index": 1,
//         "previousHash": "1705860a0e3623cce10c5daa70c3c9b918658873d742fe87c612088fea7113e7",
//         "timestamp": 1642662640372,
//         "data": "block2",
//         "hash": "6670f176d80b409cad2b0aec8e473de6dcc33241679560b3d33d519c7ec4b92b"
//       },
//       {
//         "index": 2,
//         "previousHash": "6670f176d80b409cad2b0aec8e473de6dcc33241679560b3d33d519c7ec4b92b",
//         "timestamp": 1642662640372,
//         "data": "block3",
//         "hash": "0c80031dec8a3a01b18c535c0c7032a54810e3347efe07b1310ec580aa450f37"
//       }
//     ]
//   }