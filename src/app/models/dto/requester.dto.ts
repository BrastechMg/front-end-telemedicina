
export interface RequesterDto {
    id?: string
    dateOfBirth?: string // Data de Nascimento
    cpf?: string // CPF
    healthInsuranceNumber?: string // Número da Carteirinha
    addresses?: [] // Endereços
    dependents?: [] // Dependentes
    name?: string // Nome
    email?: string // Email
    phoneNumber?: string // Telefone
    gender?: number // Sexo (0 - Masculino / 1 - Feminino)
    age?: string // Idade
}
