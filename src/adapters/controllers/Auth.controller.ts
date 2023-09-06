import { Request, Response } from "express";
import { UserRepositoryImpl } from "../repositories/user.repository.implementation";
import { User } from "../../core/domain/User/User";
import { Auth } from "../../core/domain/entitites/Auth/Auth";

export class AuthController {
  static async login(request: Request, response: Response) {
    const userRepository = new UserRepositoryImpl();
    const { email, password } = request.body;
    try {
      const user = await userRepository.findByEmail(email);

      const isPasswordValid = await User.comparePassword(
        password,
        user.getPasswordHash()
      );

      if (!isPasswordValid)
        return response
          .status(401)
          .send({ message: "Invalid password or e-mail" });

      const token = Auth.generateToken({
        userId: user.getId(),
        username: user.getUsername(),
      });
      return response.status(200).send({ token });
    } catch (error) {
      return response
        .status(404)
        .send({ message: "Invalid password or e-mail" });
    }
  }
}
