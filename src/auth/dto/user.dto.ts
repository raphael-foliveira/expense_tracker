import { ApiProperty } from "@nestjs/swagger";
import { Expense } from "src/expenses/entities/expense.entity";

class UserBaseDTO {
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
}

export class UserDTO extends UserBaseDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  active: boolean;
}

export class UserWithExpensesDTO extends UserDTO {
  @ApiProperty()
  expenses: Expense[];
}

export class UserCreateDTO extends UserBaseDTO {
  @ApiProperty()
  password: string;
}

export class UserWithPasswordDTO extends UserDTO {
  @ApiProperty()
  password: string;
}
