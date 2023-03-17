import crypto from "crypto";

class RandomGenerator {
  public static generate(length: number = 20) {
    crypto.randomBytes(length).toString("hex");
  }

  public static hashWithExpiration(
    token: string,
    expirationMinutes: number = 10
  ) {
    var currentDate = new Date();
    var newDateObj = new Date(currentDate.getTime() + expirationMinutes * 6000);
    crypto.createHash("sha256").update(token).digest("hex") +
      "." +
      newDateObj.getTime();
  }

  public static hash(token: string) {
    crypto.createHash("sha256").update(token).digest("hex");
  }

  static generateRandomNumber() {
    return `${Math.floor(100000 + Math.random() * 900000)}`;
  }

  static isTokenExpires(token: string): boolean {
    const tokenWithExpiration = token.split(".");
    const expiration = tokenWithExpiration[1];
    const currentDate = new Date().getTime();
    return currentDate > Number(expiration);
  }
}

export default RandomGenerator;
