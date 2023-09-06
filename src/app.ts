import "dotenv/config";
import express from "express";
import { UserController } from "./adapters/controllers/User.controller";
import { UserUseCaseImpl } from "./core/application/ports/usecases/User.usecase";
import { UserRepositoryImpl } from "./adapters/repositories/user.repository.implementation";
import { AuthController } from "./adapters/controllers/Auth.controller";
import { validateJwtMiddleware } from "./adapters/middlewares/Jwt.middleware";
const app = express();

app.use(express.json());
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const repository = new UserRepositoryImpl();
const userUseCase = new UserUseCaseImpl(repository);
const userController = new UserController(userUseCase);
app.post("/user", validateJwtMiddleware, async (request, response) => {
  await userController.createUser(request, response);
});
app.post("/login", async (request, response) => {
  await AuthController.login(request, response);
});
