import { DoctorDto } from "./doctor.dto"
import { AddressDto } from "./address.dto"
import { MedicalRecordDto } from "./medical-record.dto"
import { BuyerDto } from "./buyer.dto"
import { RequesterDto } from "./requester.dto"
import { SpecialtyDto } from "./specialty.dto"
import { PrescriptionDto } from "./prescription.dto"

export interface GetAppointmentsDto {    
    id?: number // ID do Atendimento
    patientId?: string // ID do Paciente
    partnerId?: number // ID do Parceiro
    buyerId?: string // ID do Responsável
    dateAppointment?: string // Data do Atendimento
    createDate?: string // Data de Solicitação
    type?: number // (1 - Presencial / 5 - Áudio / 6 - Video)
    status?: number // (1 = Criado / 6 = Em Andamento / 7 = Finalizado / 8 = Cancelado pelo Sistema / 9 = Pré-Agendamento / 10 = Cancelado pelo Paciente / 11 = Cancelado pelo Médico / 12 = No Show)
    address?: AddressDto
    doctor?: DoctorDto
    medicalrecord?: MedicalRecordDto // Registro Médico
    buyer?: BuyerDto  // Responsável
    requester?: RequesterDto // Paciente
    specialty?: SpecialtyDto // Especialidade do Atendimento
    symptoms?: [] // Sintomas
    requestDate?: string // Data de Solicitação
    doctorConfirmedDate?: string // Data de Aceite do Médico
    patientName?: string // Nome do Paciente
    contactNumber?: string // Telefone de Contato
    contactCode?: string // Código de Telefone de Contato
    reason?: string // Queixa
    roomName?: string // Código da Sala de Vídeo
    confirmedDate?: string // Data de Confirmação
    sellerFinalizedDate?: string // Data de Finalização do Atendimento
    sellerConfirmedDate?: string // Data de Aceite do Médico
    statusReason?: string // Motivo de Cancelamento
    statusReasonOther?: string;
    needAccompaniment?: boolean // Acompanhamento Necessário
    prescriptions?: PrescriptionDto[]
    mediaErrors?: [] // Erros de Conexão
    videoRoomLink?: string // Link da Sala para Acesso   
    appointmentContabilized?: boolean // Atendimento Contabilizado
    doctorRating?: string // Avaliação do Médico
    doctorComments?: string // Comentários do Médico
    patientRating?: string // Avaliação do Paciente
    patientQualityRating?: string // Comentários do Paciente
    patientGoingToPS?: string // Se o paciente estava indo ao PS
}