import { Injectable } from '@nestjs/common'
import { Prisma, Role, User } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<Omit<User, 'password'>> {
    const hashed = await bcrypt.hash(data.password, 10);
    const { password: _password, ...user } = await this.prisma.user.create({
			data: { ...data, password: hashed, role: Role.user },
		});
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async getUserById(id: number): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    const { password: _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async updateRefreshToken(userId: number, hashedRefreshToken: string) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken,
      },
    })
  }

  async updateUser(userId: number, name: string, surname: string, phone: string){
    return this.prisma.user.update({
      where: {
        id: userId
      },
      data: {name, surname, phone}
    })
  }

  async selectPayment(userId: number, selectedPaymentId: number | null) {
		return this.prisma.user.update({
			where: { id: userId },
			data: { selectedPaymentId:  { set: selectedPaymentId } }
		})
	}
}