import { UserRole } from '@ruralmart/shared';

export class CreateUserDto {
  fullName!: string;
  email!: string;
  phone!: string;
  password!: string;
  role?: UserRole;
}
