import { HttpException, Inject, Injectable } from "@nestjs/common";
import { FindManyOptions, Repository } from "typeorm";
import { ExpenseCreateDTO, ExpenseUpdateDTO } from "./dto/expense.dto";
import { Expense } from "./entities/expense.entity";

@Injectable()
export class ExpensesService {
  constructor(
    @Inject("EXPENSES_REPOSITORY")
    private repository: Repository<Expense>,
  ) {}

  async findAll(options: FindManyOptions<Expense>) {
    return this.repository.find(options);
  }

  async findOne(id: number, relations = { user: false }) {
    return this.repository.findOne({
      where: { id },
      relations,
    });
  }

  async create(expense: ExpenseCreateDTO) {
    return this.repository.save(expense);
  }

  async update(id: number, expenseData: ExpenseUpdateDTO) {
    const expenseToUpdate = await this.repository.findOne({ where: { id } });
    if (!expenseToUpdate) {
      throw new HttpException("Expense not found", 404);
    }
    const updatedExpense = {
      ...expenseToUpdate,
      ...expenseData,
    };
    return this.repository.save(updatedExpense);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
