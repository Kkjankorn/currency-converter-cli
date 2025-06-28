import axios from 'axios';
import dotenv from 'dotenv';
import { HistoryManager } from './history';
import { HistoryEntry } from './types';

dotenv.config();

const API_URL = 'https://api.exchangerate.host/convert';
const API_KEY = process.env.EXCHANGE_API_KEY;

export async function convertCurrency(amount: number, from: string, to: string[]): Promise<void> {
  const results: Record<string, number> = {};

  for (const target of to) {
    try {
      const res = await axios.get(API_URL, {
        params: {
          from,
          to: target,
          amount,
          access_key: API_KEY,
        },
      });

      const value = res.data.result;
      results[target] = value;
      console.log(`💱 ${amount} ${from} = ${value.toFixed(2)} ${target}`);
    } catch (error: any) {
      console.error(`❌ Failed to convert to ${target}:`, error.message);
    }
  }

  // Save to history
  const entry: HistoryEntry = {
    timestamp: new Date().toISOString(),
    amount,
    from,
    to,
    results
  };
  HistoryManager.save(entry);
}
