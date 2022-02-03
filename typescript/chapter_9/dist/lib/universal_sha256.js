var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function sha256_node(data) {
    const crypto = require('crypto');
    return Promise.resolve(crypto.createHash('sha256').update(data).digest('hex'));
    // sha256 해시를 생성
}
function sha256_browser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const msgUint84Array = new TextEncoder().encode(data); // utf8 형식으로 문자열 인코딩
        const hashByteArray = yield crypto.subtle.digest('SHA-256', msgUint84Array); // 데이터를 해시함
        const hashArray = Array.from(new Uint8Array(hashByteArray)); // ArrayBuffer에서 Array로 변환
        const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join(''); // byte에서 16진수 문자열로 변환
        return Promise.resolve(hashHex);
    });
}
export const sha256 = typeof window === 'undefined'
    ? sha256_node
    : sha256_browser;
