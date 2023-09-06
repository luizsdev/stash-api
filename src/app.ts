import "dotenv/config";
import express from "express";
import { UserController } from "./adapters/controllers/User.controller";
import { UserUseCaseImpl } from "./core/application/ports/usecases/CreateUser.usecase";
import { UserRepositoryImpl } from "./adapters/repositories/user.repository.implementation";
const app = express();

app.use(express.json());
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const repository = new UserRepositoryImpl();
const userUseCase = new UserUseCaseImpl(repository);
const userController = new UserController(userUseCase);
app.post("/user", async (request, response) => {
  await userController.createUser(request, response);
});
