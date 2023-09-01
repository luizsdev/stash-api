import { Request, Response } from "express";
import { UserUseCase } from "../../core/application/ports/usecases/CreateUser.usecase";
export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  async createUser(request: Request, response: Response): Promise<any> {
    const { userName, password, fullName } = request.body;
    try {
      const user = await this.userUseCase.save({
        userName,
        password,
        fullName,
      });
      return response.status(201).json({
        message: "Sucess",
        user,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
