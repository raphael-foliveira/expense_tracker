import { DataSource } from 'typeorm';
import { Expense } from './entities/expense.entity';

export const expensesProviders = [
  {
    provide: 'EXPENSES_REPOSITORY',
    useFactory: (datasource: DataSource) => datasource.getRepository(Expense),
    inject: ['DATABASE_CONNECTION'],
  },
];
