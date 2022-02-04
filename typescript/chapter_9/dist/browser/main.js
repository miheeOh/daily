var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Blockchain } from '../lib/bc_transactions.js';
var Status;
(function (Status) {
    Status["Initialization"] = "\u23F3 Initializing the blockchain, creating the genesis block...";
    Status["AddTransaction"] = "\uD83D\uDCB8 Add one or more transactions.";
    Status["ReadyToMine"] = "\u2705 Ready to mine a new block.";
    Status["MineInProgress"] = "\u23F3 Mining a new block...";
})(Status || (Status = {}));
const amountEl = document.getElementById('amount');
const blocksEl = document.getElementById('blocks');
const confirmBtn = document.getElementById('confirm');
const pendingTransactionsEl = document.getElementById('pending-transactions');
const recipientEl = document.getElementById('recipient');
const senderEl = document.getElementById('sender');
const statusEl = document.getElementById('status');
const transferBtn = document.getElementById('transfer');
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Subscribe to events.
        transferBtn.addEventListener('click', addTransaction);
        confirmBtn.addEventListener('click', mineBlock);
        statusEl.textContent = Status.Initialization;
        const blockchain = new Blockchain();
        yield blockchain.createGenesisBlock();
        blocksEl.innerHTML = blockchain.chain.map((b, i) => generateBlockHtml(b, i)).join('');
        statusEl.textContent = Status.AddTransaction;
        toggleState(true, false);
        function addTransaction() {
            blockchain.createTransaction({
                sender: senderEl.value,
                recipient: recipientEl.value,
                amount: parseInt(amountEl.value),
            });
            toggleState(false, false);
            pendingTransactionsEl.textContent = blockchain.pendingTransactions.map(t => `${t.sender} → ${t.recipient}: $${t.amount}`).join('\n');
            statusEl.textContent = Status.ReadyToMine;
            // Reset form's value.
            senderEl.value = '';
            recipientEl.value = '';
            amountEl.value = '0';
        }
        function mineBlock() {
            return __awaiter(this, void 0, void 0, function* () {
                statusEl.textContent = Status.MineInProgress;
                toggleState(true, true);
                yield blockchain.minePendingTransaction();
                pendingTransactionsEl.textContent = 'No pending transactions at the moment.';
                statusEl.textContent = Status.AddTransaction;
                blocksEl.innerHTML = blockchain.chain.map((b, i) => generateBlockHtml(b, i)).join('');
                toggleState(true, false);
            });
        }
    });
})();
function toggleState(confirmation, transferForm) {
    transferBtn.disabled = amountEl.disabled = senderEl.disabled = recipientEl.disabled = transferForm;
    confirmBtn.disabled = confirmation;
}
function generateBlockHtml(block, index) {
    return `
    <div class="block">
      <span class="block__index">#${index}</span>
      <span class="block__timestamp">${new Date(block.timestamp).toLocaleTimeString()}</span>
      <div class="prev-hash">
        <div class="hash-title">← PREV HASH</div>
        <div class="hash-value">${block.previousHash}</div>
      </div>
      <div class="this-hash">
        <div class="hash-title">THIS HASH</div>
        <div class="hash-value">${block.hash}</div>
      </div>
      <div class="block__transactions">
        <div class="hash-title">TRANSACTIONS</div>
        <pre class="transactions-value">${block.transaction.map(t => `${t.sender} → ${t.recipient} - $${t.amount}`)}</pre>
      </div>
    </div>
  `;
}
