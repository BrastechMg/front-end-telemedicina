export interface PrescriptionDto {
    prescriptionIdMemed?: number
    prescriptionPdfUrl?: string // URL em PDF da Prescrição
    smsUrl?: string // URL da Prescrição enviada por SMS
    prescriptionCode?: string // Código da Prescrição enviada por SMS
    prescriptionType?: string //Tipo de prescrição 
}
