import { Request, Response } from "express";
import { UserUseCase } from "../../core/application/ports/usecases/User.usecase";
export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  async createUser(request: Request, response: Response): Promise<Response> {
    try {
      const { username, password, fullName, email } = request.body;
      const user = await this.userUseCase.create({
        username,
        password,
        fullName,
        email,
      });
      return response.status(201).json(user);
    } catch {
      return response.status(400).json({ message: "Error creating user" });
    }
  }
}
