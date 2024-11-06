import { AddressDto } from "./address.dto";
import { SpecialtyDto } from "./specialty.dto";

export class AppointmentDto {
    dateAppointment?: string;
    buyerId?: string;
    patientId?: string;
    insuranceId?: number;
    partnerId?: number;
    address!: AddressDto;
    specialty?: SpecialtyDto;
    specialtyId?: number;
    isInsurance?: boolean;
    type?: number;
    timeZone?: string;
    contactCode?: string;
    contactNumber?: string;
    contactEmail?: string;
    reason?: string;
    symptoms?: string[];
    gop?: Object = 'null';
}