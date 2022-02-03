function sha256_node(data:string):Promise<string>{ // nodejs에서 런타임되는 함수
    const crypto = require('crypto')
    return Promise.resolve(crypto.createHash('sha256').update(data).digest('hex'));
    // sha256 해시를 생성
}

async function sha256_browser(data:string):Promise<string> {  // 웹브라우저에서 사용되는 함수
    const msgUint84Array = new TextEncoder().encode(data)  // utf8 형식으로 문자열 인코딩
    const hashByteArray = await crypto.subtle.digest('SHA-256',msgUint84Array);  // 데이터를 해시함
    const hashArray = Array.from(new Uint8Array(hashByteArray)) // ArrayBuffer에서 Array로 변환
    const hashHex = hashArray.map(b=>('00'+b.toString(16)).slice(-2)).join('')  // byte에서 16진수 문자열로 변환
    return Promise.resolve(hashHex)
} 

export const sha256 = typeof window === 'undefined'
                    ? sha256_node  
                    : sha256_browser
