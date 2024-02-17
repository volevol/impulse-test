import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import config from 'config/config';
import * as crypto from 'crypto';
import * as nacl from 'tweetnacl';

@Injectable()
export class AuthCryptoService {
  STUB_PASSWORD = argon2.hash(crypto.randomBytes(16));

  convertStringToUnint8Array(
    string: string,
    encoding: BufferEncoding = 'utf8',
  ): Uint8Array {
    return Uint8Array.from(Buffer.from(string, encoding));
  }

  convertUint8ArrayToString(
    array: Uint8Array,
    stringEncoding: BufferEncoding = 'utf8',
  ): string {
    return Buffer.from(array).toString(stringEncoding);
  }

  encrypt(plainString: string): string {
    const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);

    // encrypt string and concat it with nonce -> string:nonce
    const encryptedString = `${this.convertUint8ArrayToString(
      nacl.secretbox(
        this.convertStringToUnint8Array(plainString),
        nonce,
        this.convertStringToUnint8Array(config.encryptionKey),
      ),
      'hex',
    )}:${this.convertUint8ArrayToString(nonce, 'hex')}`;

    return encryptedString;
  }

  decrypt(encryptedString: string): string {
    const [encryptedValue, nonce] = encryptedString.split(':');

    const decryptedString = this.convertUint8ArrayToString(
      nacl.secretbox.open(
        this.convertStringToUnint8Array(encryptedValue, 'hex'),
        this.convertStringToUnint8Array(nonce, 'hex'),
        this.convertStringToUnint8Array(config.encryptionKey),
      ),
    );

    return decryptedString;
  }

  async hash(plainString: string): Promise<string> {
    const sha512 = nacl.hash(Uint8Array.from(Buffer.from(plainString)));
    return argon2.hash(this.convertUint8ArrayToString(sha512, 'hex'));
  }

  async verifyPassword({ password, passwordFromDb }): Promise<boolean> {
    const passwordSha512 = nacl.hash(Uint8Array.from(Buffer.from(password)));

    // Prevent time based attack
    return argon2.verify(
      passwordFromDb ?? (await this.STUB_PASSWORD),
      this.convertUint8ArrayToString(passwordSha512, 'hex'),
    );
  }

  async encryptString(plainString: string): Promise<string> {
    const hashedString = await this.hash(plainString);
    return this.encrypt(hashedString);
  }
}
