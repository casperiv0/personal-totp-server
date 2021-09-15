import { authenticator } from "otplib";

export function generate6DigitCode(secret: string) {
  return authenticator.generate(secret);
}
