import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeValues = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(transaction => transaction.value);

    const totalIncome =
      incomeValues.length > 0
        ? incomeValues.reduce((total, next) => total + next)
        : 0;

    const outcomeValues = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(transaction => transaction.value);

    const totalOutcome =
      outcomeValues.length > 0
        ? outcomeValues.reduce((total, next) => total + next)
        : 0;

    return {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
