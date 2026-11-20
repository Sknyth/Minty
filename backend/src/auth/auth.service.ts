import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UserService } from 'src/user/user.service'
import { JwtPayload } from './types'

@Injectable()
export class AuthService {
	constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

	async signIn(email: string, password: string): Promise<{ access_token: string, refresh_token: string }> {
		if (typeof email !== 'string' || !email || typeof password !== 'string' || !password) {
			throw new UnauthorizedException('Incorrect email or password')
		}

		const user = await this.usersService.getUserByEmail(email);
		if (!user || !(await bcrypt.compare(password, user.password))) {
			throw new UnauthorizedException('Incorrect email or password')
		}
		const payload = { id: user.id, email: user.email, role: user.role };
		const accessToken = this.jwtService.sign(payload, {
			secret: process.env.JWT_ACCESS_SECRET,
			expiresIn: '15m',
		})

		const refreshToken = this.jwtService.sign(payload, {
			secret: process.env.JWT_REFRESH_SECRET,
			expiresIn: '7d',
		})

		const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)

		await this.usersService.updateRefreshToken(
			user.id,
			hashedRefreshToken,
		)

		return { access_token: accessToken, refresh_token: refreshToken };
	}

	async refresh(refreshToken: string) {
		try {
			const payload = this.jwtService.verify<JwtPayload>(refreshToken, {
				secret: process.env.JWT_REFRESH_SECRET,
			})

			const user = await this.usersService.getUserById(payload.id)

			if (!user || !user.hashedRefreshToken) return null

			const isValid = await bcrypt.compare(refreshToken, user.hashedRefreshToken)

			if (!isValid) return null

			const newPayload = { id: user.id, email: user.email, role: user.role }
			const accessToken = this.jwtService.sign(newPayload, {
				secret: process.env.JWT_ACCESS_SECRET,
				expiresIn: '15m',
			})

			return { access_token: accessToken }
		} catch {
			return null
		}
	}
}
