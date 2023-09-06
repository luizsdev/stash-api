import bcrypt from "bcrypt";
export class User {
  constructor(
    private id: string,
    private email: string,
    private username: string,
    private passwordHash: string,
    private fullName: string
  ) {}

  static async createNewUser(
    username: string,
    password: string,
    fullName: string,
    email: string,
    id: string
  ): Promise<User> {
    const passwordHash = await this.hashPassword(password);
    return new User(id, email, username, passwordHash, fullName);
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
  getId(): string {
    return this.id;
  }
  getEmail(): string {
    return this.email;
  }

  private static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
  static async comparePassword(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }
}
