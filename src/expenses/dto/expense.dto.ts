import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from 'src/users/dto/user.dto';

class ExpenseBaseDTO {
  @ApiProperty()
  description: string;
  @ApiProperty()
  amount: number;
}

class UserExpenseCreateDTO {
  @ApiProperty()
  id: number;
}

export class ExpenseCreateDTO extends ExpenseBaseDTO {
  @ApiProperty()
  user: UserExpenseCreateDTO;
}

export class ExpenseUpdateDTO extends ExpenseBaseDTO {}

export class ExpenseDTO extends ExpenseBaseDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  date: Date;
  @ApiProperty()
  user?: UserDTO;
}
