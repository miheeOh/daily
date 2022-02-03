import * as crypto from 'crypto';
let nonce = 0;

// async await를 사용 , 그 반환값의 타입은 Promise<type> 
async function generateHash(input:string):Promise<string>{
    const msgBuffer = new TextEncoder().encode(input);   // utf8로 변환
    const hashBuffer = await crypto.subtle.digest('SHA-256',msgBuffer);   // 메시지의 해시값을 구함
    const hashArray = Array.from(new Uint8Array(hashBuffer));  // ArrayBuffer에서 Array로 변환
    const hashHex = hashArray.map(b=>('00'+b.toString(16)).slice(-2)).join('');  // 바이트를 16진수로 변환
    return hashHex;
}

async function calculateHashWithNonce(nonce:number):Promise<string>{
    const data = 'hello world' + nonce;
    return generateHash(data)
}


// 더이상 crypto모듈 지원하지 않음.... 