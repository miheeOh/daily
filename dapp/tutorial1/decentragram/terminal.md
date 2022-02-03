> npm install 
// nvm use 17
> truffle migrate --reset
// 안 될 경우에는 nvm use 14로 해서 노드 버전 바꾼후에 실행
> truffle console
> decentragram = await Decentragram.deployed()
// undefined 나옴
> decentragram
> decentragram.address
> name = await decentragram.name()

> truffle test

> truffle migrate --reset