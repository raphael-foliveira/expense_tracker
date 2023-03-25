import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { usersProviders } from "./providers/users.providers";
import { UsersService } from "./users.service";

@Module({
  providers: [AuthService, UsersService, ...usersProviders],
  controllers: [AuthController],
  exports: [AuthService, UsersService],
  imports: [DatabaseModule],
})
export class AuthModule {}
