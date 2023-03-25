import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { ExpensesModule } from "./expenses/expenses.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ExpensesModule,
    DatabaseModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
  ],
})
export class AppModule {}
