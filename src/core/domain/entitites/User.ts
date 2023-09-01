export class User {
  constructor(
    private userName: string,
    private passwordHash: string,
    private fullName: string
  ) {}

  static createNewUser(
    userName: string,
    password: string,
    fullName: string
  ): User {
    const passwordHash = password; // TODO: hash password
    return new User(userName, passwordHash, fullName);
  }

  getUserName(): string {
    return this.userName;
  }
  getPasswordHash(): string {
    return this.passwordHash;
  }
  getFullName(): string {
    return this.fullName;
  }
}
