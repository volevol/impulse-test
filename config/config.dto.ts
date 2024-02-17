export class ConfigDto {
  port: string;
  environment?: string;
  jwtSecret: string;
  encryptionKey: string;
}
