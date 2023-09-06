import { Request, Response } from "express";
import { UserUseCase } from "../../core/application/ports/usecases/CreateUser.usecase";
export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  async createUser(request: Request, response: Response): Promise<Response> {
    const { username, password, fullName } = request.body;
    try {
      const user = await this.userUseCase.save({
        username,
        password,
        fullName,
      });
      return response.status(201).json(user);
    } catch {
      throw new Error();
    }
  }
}
