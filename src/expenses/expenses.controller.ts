import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	Req,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { RequestWithUser } from "src/auth/auth.middleware";
import { FindManyOptions } from "typeorm";
import {
	ExpenseCreateDTO,
	ExpenseDTO,
	ExpenseUpdateDTO,
} from "./dto/expense.dto";
import { ExpensesService } from "./expenses.service";
import { Expense } from "./entities/expense.entity";

@ApiTags("expenses")
@Controller("expenses")
export class ExpensesController {
	constructor(private service: ExpensesService) {}

	@ApiResponse({ status: 200, type: ExpenseDTO, isArray: true })
	@Get()
	async findAll(@Req() req: RequestWithUser) {
		return this.service.findAll(req.user.id);
	}

	@ApiResponse({ status: 200, type: ExpenseDTO })
	@Get(":id")
	async findOne(@Param("id") id: number) {
		return this.service.findOne(id, { user: true });
	}

	@ApiResponse({ status: 201, type: ExpenseDTO })
	@Post()
	async create(@Req() req: RequestWithUser, @Body() expense: ExpenseCreateDTO) {
		return this.service.create(expense, req.user);
	}

	@ApiResponse({ status: 200, type: ExpenseDTO })
	@Put(":id")
	async update(@Param("id") id: number, @Body() expense: ExpenseUpdateDTO) {
		return this.service.update(id, expense);
	}

	@ApiResponse({ status: 200 })
	@Delete(":id")
	async delete(@Param("id") id: number) {
		return this.service.delete(id);
	}
}
