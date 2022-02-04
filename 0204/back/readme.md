##### > npm install web3
##### > node
##### > const Web3 = require('web3')
##### > const web3 = new Web3('[endpoint]')
##### > web3
해당 라이브러리의 내용 보여줌
##### > web3.eth.accounts.create()
계정 생성
##### > web3.eth.accounts.privateKeyToAccount('0x3b9e70d55d6502d5379aaa046437bbd4c29911b8c420a64fcdafe2c788c220ac')
개인키를 통해 계정의 정보 보여줌
##### > web3.eth.getBalance('0x5556A44305ABdA99A0D7c2Adb9780084B10d2E0C').then(console.log)
// address를 통해 해당 계정의 잔액을 알려줌.

### 트랜잭션 실행
#### app.js 파일 참고
##### > npm install ethereumjs-tx