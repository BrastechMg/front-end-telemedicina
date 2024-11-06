import { HypothesisDto } from "./hypothesis.dto"
import { PersonalHistoryDto } from "./personal-history.dto"
import { SymptomsDto } from "./symptoms.dto"

export interface MedicalRecordDto {
    appointmentId?: number
    id?: number
    oldId?: number
    personalHistory?: PersonalHistoryDto // Antecedentes Pessoais
    hypothesis?: HypothesisDto // Hipótese diagnóstica
    outcome?: string // Desfecho
    mainSymptoms?: SymptomsDto[] // Principais Sintomas
    createdDate?: string // Data de Preenchimento
    diseaseHistory?: string // Antecedentes Pessoais (Outros)
    personalHistoryDescription?: string // Antecedentes Pessoais Descrição
    orientation?: string // Conduta
    isEmergencyRoomReferred?: boolean // Pronto Socorro Necessário
    isRemovalRequired?: boolean // Remocação Necessária
    isCoordinatedCareReferred?: boolean // Cuidado Coordenado Indicado
    coordinatedCareReferred?: [] // Cuidado Coordenado
    isHomeDoctorReferred?: boolean // Médico Presencial Necessário
    needAccompaniment?: boolean // Acompanhamento de Enfermagem Necessário
    forwardings?: [] // Encaminhamentos
  }
