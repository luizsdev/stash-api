import { User } from "../../../domain/entitites/User";
import { CreateUserDTO } from "../../../dto/CreateUser.dto";

export interface UserRepository {
  create(request: CreateUserDTO): Promise<User>;
}
