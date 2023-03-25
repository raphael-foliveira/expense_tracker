import { ApiProperty } from "@nestjs/swagger";

export class AuthDTO {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}

export class TokenDTO {
  @ApiProperty()
  token: string;
}
