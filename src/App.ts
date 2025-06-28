import { convertCurrency } from './currency_converter';
import { HistoryManager } from './history';

const args = process.argv.slice(2);
const [amountStr, from, ...to] = args;

if (args.length === 0 || args.includes('--help')) {
  console.log(`\nUsage: ts-node src/App.ts <amount> <from> <to1> [to2 to3 ...]
Example: ts-node src/App.ts 100 USD THB JPY EUR
         ts-node src/App.ts --history`);
  process.exit(0);
}

if (args.includes('--history')) {
  HistoryManager.print();
  process.exit(0);
}

if (!amountStr || !from || to.length === 0) {
  console.error('❌ Invalid arguments. Use --help for usage.');
  process.exit(1);
}

const amount = parseFloat(amountStr);
if (isNaN(amount)) {
  console.error('❌ Invalid amount.');
  process.exit(1);
}

convertCurrency(amount, from.toUpperCase(), to.map(t => t.toUpperCase()));

// --- history.json ---
[]
