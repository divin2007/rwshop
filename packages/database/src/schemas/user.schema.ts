import { Schema, Document, Types } from 'mongoose';
import { UserRole } from '@ruralmart/shared';

export interface IDevice {
  token: string;
  platform: string;
  lastUsed: Date;
}

export interface ISecurity {
  lastLoginAt?: Date;
  lastLoginIp?: string;
  failedLoginAttempts: number;
  lockedUntil?: Date;
  passwordChangedAt?: Date;
  twoFactorEnabled: boolean;
}

export interface IUser extends Document {
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string;
  googleId?: string;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
  avatarUrl?: string;
  devices: IDevice[];
  security: ISecurity;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    googleId: { type: String },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.BUYER },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    avatarUrl: { type: String },
    devices: [
      {
        token: { type: String, required: true },
        platform: { type: String, required: true },
        lastUsed: { type: Date, default: Date.now },
      },
    ],
    security: {
      lastLoginAt: { type: Date },
      lastLoginIp: { type: String },
      failedLoginAttempts: { type: Number, default: 0 },
      lockedUntil: { type: Date },
      passwordChangedAt: { type: Date },
      twoFactorEnabled: { type: Boolean, default: false },
    },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);
