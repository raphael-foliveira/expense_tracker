import { ApiProperty } from "@nestjs/swagger";
import { UserDTO } from "src/auth/dto/user.dto";

class ExpenseBaseDTO {
	@ApiProperty()
	description: string;
	@ApiProperty()
	amount: number;
}

export class ExpenseCreateDTO extends ExpenseBaseDTO {}

export class ExpenseUpdateDTO extends ExpenseBaseDTO {}

export class ExpenseDTO extends ExpenseBaseDTO {
	@ApiProperty()
	id: number;
	@ApiProperty()
	date: Date;
}


export class ExpenseWithUserDTO extends ExpenseDTO {
	@ApiProperty()
	user: UserDTO;
}
