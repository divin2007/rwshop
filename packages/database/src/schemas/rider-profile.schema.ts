import { Schema, Document, Types } from 'mongoose';

export interface IRiderProfile extends Document {
  userId: Types.ObjectId;
  plateNumber: string;
  isActive: boolean;
  currentLocation: { lat: number; lng: number; updatedAt: Date };
  rating: number;
  totalDeliveries: number;
  rejectionRate: number;
  licenseUrl?: string;
  vehiclePhotoUrl?: string;
  idCardUrl?: string;
  insuranceUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export const RiderProfileSchema = new Schema<IRiderProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    plateNumber: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    currentLocation: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 },
      updatedAt: { type: Date, default: Date.now },
    },
    rating: { type: Number, default: 0 },
    totalDeliveries: { type: Number, default: 0 },
    rejectionRate: { type: Number, default: 0 },
    licenseUrl: { type: String },
    vehiclePhotoUrl: { type: String },
    idCardUrl: { type: String },
    insuranceUrl: { type: String },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);
