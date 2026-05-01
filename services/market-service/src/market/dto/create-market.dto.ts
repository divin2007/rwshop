import { ILocation } from '@ruralmart/database';

export class CreateMarketDto {
  name!: string;
  slug!: string;
  code!: string;
  type!: 'public' | 'individual';
  ownerId?: string; // ObjectId string
  description?: string;
  location!: ILocation;
}
