var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Blockchain } from "../lib/bc_transactions";
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('initializing the blockchain, creating the gensesis block');
        const bc = new Blockchain();
        yield bc.createGenesisBlock();
        bc.createTransaction({ sender: 'mihee', recipient: 'jin', amount: 20 });
        bc.createTransaction({ sender: 'mihee2', recipient: 'jin2', amount: 30 });
        yield bc.minePendingTransaction();
        bc.createTransaction({ sender: 'mihee3', recipient: 'jin3', amount: 40 });
        bc.createTransaction({ sender: 'mihee4', recipient: 'jin4', amount: 50 });
        yield bc.minePendingTransaction();
        console.log(JSON.stringify(bc, null, 2));
    });
})();
