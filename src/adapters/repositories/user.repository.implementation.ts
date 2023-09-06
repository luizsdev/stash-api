import { PrismaClient } from "@prisma/client";
import { CreateUserDTO } from "../../core/dto/CreateUser.dto";
import { UserRepository } from "../../core/application/ports/repositories/User.repository";
import { User } from "../../core/domain/entitites/User";
export class UserRepositoryImpl implements UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(user: CreateUserDTO): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        username: user.username,
        fullName: user.fullName,
        password: user.password,
        email: user.email,
      },
    });
    return User.createNewUser(
      createdUser.username,
      createdUser.password,
      createdUser.fullName,
      createdUser.email,
      createdUser.id.toString()
    );
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return User.createNewUser(
      user.username,
      user.password,
      user.fullName,
      user.email,
      user.id.toString()
    );
  }
}
