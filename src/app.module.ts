import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ExpensesModule } from './expenses/expenses.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, ExpensesModule, DatabaseModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
