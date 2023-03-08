import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { ExpensesController } from './expenses.controller';
import { expensesProviders } from './expenses.providers';
import { ExpensesService } from './expenses.service';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule],
  controllers: [ExpensesController],
  providers: [ExpensesService, ...expensesProviders],
})
export class ExpensesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'expenses', method: RequestMethod.POST },
        { path: 'expenses', method: RequestMethod.PUT },
        { path: 'expenses', method: RequestMethod.DELETE },
      );
  }
}
