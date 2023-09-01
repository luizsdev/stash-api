import { User } from "../../../domain/entitites/User";
import { CreateUserDTO } from "../../../dto/CreateUser.dto";
import { UserRepository } from "../repositories/User.repository";

export interface UserUseCase {
  save(request: CreateUserDTO): Promise<User>;
}

export class UserUseCaseImpl implements UserUseCase {
  constructor(private userRepository: UserRepository) {}
  async save(request: CreateUserDTO): Promise<User> {
    try {
      const user = await this.userRepository.create(request);
      return user;
    } catch (error) {
      throw new Error();
    }
  }
}
