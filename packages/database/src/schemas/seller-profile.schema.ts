import { Schema, Document, Types } from 'mongoose';

export interface ISellerProfile extends Document {
  userId: Types.ObjectId;
  marketId: Types.ObjectId;
  stallId: string;
  stallName: string;
  description: string;
  isApproved: boolean;
  rating: number;
  totalSales: number;
  businessPermitUrl?: string;
  idCardUrl?: string;
  stallPhotoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export const SellerProfileSchema = new Schema<ISellerProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    marketId: { type: Schema.Types.ObjectId, ref: 'Market', required: true },
    stallId: { type: String, required: true },
    stallName: { type: String, required: true },
    description: { type: String },
    isApproved: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    totalSales: { type: Number, default: 0 },
    businessPermitUrl: { type: String },
    idCardUrl: { type: String },
    stallPhotoUrl: { type: String },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);
