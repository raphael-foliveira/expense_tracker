import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { UsersService } from "src/auth/users.service";
import { SignupDTO } from "./dto/signup.dto";

const SECRET = "secret";

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}
	verifyToken(token: string) {
		return jwt.verify(token, SECRET);
	}

	signToken(payload: any) {
		return jwt.sign(payload, SECRET, { expiresIn: "1day" });
	}

	async createAccount(userData: SignupDTO) {
		const user = await this.usersService.create(userData);
		const token = this.signToken({
			id: user.id,
			username: user.username,
			email: user.email,
		});
		return { token, userId: user.id };
	}

	async authenticate({ username, password }) {
		let user = await this.usersService.findOneByUsername(username);
		if (!user) {
			user = await this.usersService.findOneByEmail(username);
		}
		if (user && user.password === password) {
			const token = this.signToken({
				id: user.id,
				username: user.username,
				email: user.email,
			});
			return { token };
		}
	}
}
