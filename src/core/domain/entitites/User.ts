import bcrypt from "bcrypt";
export class User {
  constructor(
    private username: string,
    private passwordHash: string,
    private fullName: string
  ) {}

  static async createNewUser(
    username: string,
    password: string,
    fullName: string
  ): Promise<User> {
    const passwordHash = await this.hashPassword(password);
    return new User(username, passwordHash, fullName);
  }

  getUsername(): string {
    return this.username;
  }
  getPasswordHash(): string {
    return this.passwordHash;
  }
  getFullName(): string {
    return this.fullName;
  }

  private static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
