import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UserService, jwtService: JwtService);
    signIn(email: string, password: string): Promise<{
        access_token: string;
        refresh_token: string;
    } | null>;
    refresh(refreshToken: string): Promise<{
        access_token: string;
    } | null>;
}
