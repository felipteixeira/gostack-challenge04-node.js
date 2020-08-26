import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';


interface Input {
  title: string;
  value: number;
  type: 'income' | 'outcome';
};

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  };

  public execute({ title, value, type }: Input): Transaction {

    if (['income', 'outcome'].includes(type)) {
      const { total } = this.transactionsRepository.getBalance();

      if (type === 'outcome' && total < value) {
        throw new Error('You do not have enough balance');
      }

      const transaction = this.transactionsRepository.create({
        title,
        value,
        type
      });

      return transaction;

    } else {
      throw new Error('Plase type a valid type!');
    }
  };
};

export default CreateTransactionService;
