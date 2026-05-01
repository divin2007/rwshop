export enum UserRole {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  RIDER = 'RIDER',
  ADMIN = 'ADMIN',
}

export interface ResponseDto<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: any;
}
