import { SpecialtyDto } from "./specialty.dto"

export interface DoctorDto {
    id?: string // ID do Médico
    name?: string // Nome do Médico
    crm?: string // CRM
    crmUF?: string // UF do CRM
    bio?: string // Biografia
    gender?: number // Sexo (0 - Masculino / 1 - Feminino)
    specialties?: SpecialtyDto[]
    profilePhotoUrl?: string // URL da foto de perfil
    namePrefix?: string // Prefixo
}