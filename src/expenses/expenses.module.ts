import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from "@nestjs/common";
import { AuthMiddleware } from "src/auth/auth.middleware";
import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "src/database/database.module";
import { ExpensesController } from "./expenses.controller";
import { expensesProviders } from "./expenses.providers";
import { ExpensesService } from "./expenses.service";

@Module({
	imports: [AuthModule, DatabaseModule],
	controllers: [ExpensesController],
	providers: [ExpensesService, ...expensesProviders],
})
export class ExpensesModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes("expenses");
	}
}
