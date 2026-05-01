export class CreateSellerDto {
  userId!: string;
  marketId!: string;
  stallId!: string;
  stallName!: string;
  description?: string;
  businessPermitUrl?: string;
  idCardUrl?: string;
  stallPhotoUrl?: string;
}
