import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { ExpensesModule } from "./expenses/expenses.module";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";

@Module({
	imports: [
		ExpensesModule,
		DatabaseModule,
		AuthModule,
		ConfigModule.forRoot({
			envFilePath: ".env",
		}),
	],
	controllers: [AppController],
})
export class AppModule {}
