export interface AddressDto {
    id?: number 
    postalCode: string;
    street?: string
    number?: number
    complement?: string
    neighborhood?: string
    city?: string
    state?: string
    isPrimary?: boolean
    sector?: string 
    fullAddress?: string
}

