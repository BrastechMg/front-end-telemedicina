import { CreditCardDTO } from "./creditCardDTO";

export interface TokenizationCreditCardDTO {
    cpf: string,
    creditCard: CreditCardDTO;
    ip?: string;
}