import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { UserDTO } from 'src/auth/dto/user.dto';
import { UsersService } from 'src/auth/users.service';
import { AuthService } from './auth.service';

export interface RequestWithUser extends Request {
  user: UserDTO;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private service: AuthService,
    private usersService: UsersService,
  ) {}

  async use(req: RequestWithUser, _: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(' ')[1];
      const { id } = this.service.verifyToken(token) as JwtPayload;
      req.user = await this.usersService.findOne(id);
      next();
    } catch {
      throw new HttpException('Unauthorized', 401);
    }
  }
}
