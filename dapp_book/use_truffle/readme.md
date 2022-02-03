> npm install truffle@4.1.15 -g
// npm uninstall truffle@4.1.15 -g
> truffle init
use_truffle
L contratcs  // 컴파일, 배포할 솔리디티 컨트랙트 파일이 존재하는 폴더
    LMigrations.sol   // 트러플에서 프로젝트 컨트랙트 배포를 위해 사용할 컨트랙트
L migrations   // 마이그레이션하기 위한 자바스크립트 설정 파일  
// 마이그레이션? 하나의 운영환경으로부터 더 나은 운영환경으로 옮겨지는 것.
L node_modules
L test 
L truffle.js  // 리눅스 또는 mac os 용 트러플 프로젝트 설정 파일
L truffle-config.js   // 윈도우용 트러플 프로젝트 설정파일

솔리디티파일 작성후 
> truffle compile

migrations폴더에 SimpleCoin관련 파일 추가
/*
const SimpleCoin = artifacts.require("SimpleCoin")

module.exports = function(deployer) {
    deployer.deploy(SimpleCoin, 10000);
};
*/

truffle-config.js 파일 가나쉬에 맞게 수정한 후
> truffle migrate
// 여기까지 하면 SimpleCoin이 가나쉬의 모의 네트워크에 배포된 것.

// truffle-config.js 파일 관련 내용 책 433페이지 참고.

// 442page까지

[출처]
- 이더리움디앱개발 (책)