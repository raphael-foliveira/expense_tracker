import { Body, Controller, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "src/auth/users.service";
import { AuthService } from "./auth.service";
import { AuthDTO, TokenDTO } from "./dto/auth.dto";
import { SignupDTO } from "./dto/signup.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: 200, type: TokenDTO })
  @ApiResponse({ status: 401, description: "Invalid credentials" })
  @Post("signin")
  async signIn(@Body() credentials: AuthDTO) {
    return this.authService.authenticate(credentials);
  }

  @ApiResponse({ status: 201, type: TokenDTO })
  @ApiResponse({ status: 400, description: "User already exists" })
  @Post("signup")
  async signUp(@Body() credentials: SignupDTO) {
    return this.authService.createAccount(credentials);
  }
}
