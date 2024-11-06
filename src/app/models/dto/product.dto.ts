import { BenefitDto } from "./benefit.dto";

export interface ProductDto {
  id: number;
  name: string;
  price: number;
  cardType: number;
  productBenefits: BenefitDto[];
}