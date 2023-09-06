import jwt from "jsonwebtoken";
import { JwtPayload } from "./types";

export class Auth {
  static generateToken(userInfo: JwtPayload): string {
    const { username, userId } = userInfo;
    const payload = {
      username,
      userId,
    };
    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      throw new Error(
        "JWT_SECRET is not defined in the environment variables."
      );
    }

    return jwt.sign(payload, secretKey, { expiresIn: "1h" });
  }

  static verifyToken(token: string): string | jwt.JwtPayload {
    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      throw new Error(
        "JWT_SECRET is not defined in the environment variables."
      );
    }

    const decodedToken = jwt.verify(token, secretKey);
    return decodedToken;
  }
}
