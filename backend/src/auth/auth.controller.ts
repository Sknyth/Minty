import { Controller, Post, Body, Get, UseGuards, Request, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'
import { Request as ExpressRequest } from 'express';
import type { JwtPayload } from './types';
import { Public } from './public.decorator'
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
	) {}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post('signin')
	async signIn(@Body() data: { email: string; password: string }): Promise<{ access_token: string, refresh_token: string } | null> {
		return this.authService.signIn(data.email, data.password);
	}

	@UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req: ExpressRequest & { user: JwtPayload }) {
    const user = await this.userService.getUserById(req.user.id);
    return user;
  }
	
	@Public()
	@HttpCode(HttpStatus.OK)
	@Post('refresh')
	async refresh(@Body() data: { refresh_token: string }) {
		return this.authService.refresh(data.refresh_token);
	}
}
