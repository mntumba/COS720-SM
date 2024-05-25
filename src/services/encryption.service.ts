import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private key = CryptoJS.enc.Utf8.parse('ZWDJOVMPQ4RGPG7E5P7VUQP4JNMEPDM7BMHPTZOXD6SGDAJVAKRTGZD2YIPGLAVE');
  private iv = CryptoJS.enc.Utf8.parse('MEgCQQDitu3NWr8AtAYSvAaClKseznG6VZL6L5lPECDyENXkdoErnQQR/mNnAGCkABaJJQIOc6R8jwJi0zJt020IhrNRAgMBAAE=');

  constructor() { }

  encrypt(data: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.key, { iv: this.iv }).toString();
  }

  decrypt(data: string): any {
    const decryptedDataBytes = CryptoJS.AES.decrypt(data, this.key, { iv: this.iv });
    const decryptedDataString = decryptedDataBytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedDataString);
  }
}
