import { User } from "../../../domain/entitites/User";
import { CreateUserDTO } from "../../../dto/CreateUser.dto";
import { UserRepository } from "../repositories/User.repository";

export interface UserUseCase {
  create(request: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
}

export class UserUseCaseImpl implements UserUseCase {
  constructor(private userRepository: UserRepository) {}
  async create(request: CreateUserDTO): Promise<User> {
    const user = await this.userRepository.create(request);
    return user;
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }
}
