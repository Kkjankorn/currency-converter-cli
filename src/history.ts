import { HistoryEntry } from './types';
import fs from 'fs';
import path from 'path';

const HISTORY_FILE = path.resolve(__dirname, '../history.json');

export class HistoryManager {
  static save(entry: HistoryEntry): void {
    const history = this.load();
    history.push(entry);
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
  }

  static load(): HistoryEntry[] {
    if (!fs.existsSync(HISTORY_FILE)) return [];
    const raw = fs.readFileSync(HISTORY_FILE, 'utf-8');
    return JSON.parse(raw);
  }

  static print(): void {
    const history = this.load();
    if (history.length === 0) return console.log('📭 No history found.');
    for (const entry of history) {
      console.log(`\n🕒 ${entry.timestamp} | ${entry.amount} ${entry.from} -> ${entry.to.join(', ')}`);
      for (const [to, value] of Object.entries(entry.results)) {
        console.log(`  ➤ ${value.toFixed(2)} ${to}`);
      }
    }
  }
}