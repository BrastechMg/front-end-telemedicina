import { AddressDto } from "./address.dto";

export class CustomerDto {
id?: number;
name?: string;
cpf?: string;
cnpj?: string;
email?: string;
phoneNumber?: string;
gender?: string;
bornDate?: string;
addressDto?: AddressDto;
status?:string;
statusCode?:number;
//origin?: string = "AUTOCONTRATACAO"
partnerId?: number;
}
