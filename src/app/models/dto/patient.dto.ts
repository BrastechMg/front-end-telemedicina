import { PatientAdress } from "./patientAdress.dto"

export interface Patient {
    dateAppointment: string,
    buyerId: string,
    insuranceId: string,
    partnerId: 0,
    address: PatientAdress[],
    specialty: {
        id: string
    },
    specialtyId: string,
    isInsurance: boolean,
    type: string,
    timeZone: string,
    contactCode: string,
    contactNumber: string,
    contactEmail: string,
    symptoms: [],
    gop: null
}