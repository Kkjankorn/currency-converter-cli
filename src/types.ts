export interface HistoryEntry {
  timestamp: string;
  amount: number;
  from: string;
  to: string[];
  results: Record<string, number>;
}
