import * as CryptoJS from 'crypto-js';

export class EncryptAndDecrypt {

    encryptData(data: any, key: string) {
        try {
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
            return encryptedData;
        } catch (e) {
            console.error('Erro ao criptografar os dados', e);
        }
        return null;
    }

    decryptData(encryptedData: any, key: string) {
        try {
            if (encryptedData) {
                const bytes = CryptoJS.AES.decrypt(encryptedData, key);
                const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                return decryptedData;
            }
        } catch (e) {
            console.error('Erro ao descriptografar os dados', e);
        }
        return null;
    }
}

