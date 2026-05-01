import { Schema, Document, Types } from 'mongoose';

export interface ILocation {
  type: string;
  coordinates: number[]; // [lng, lat]
  address: string;
  city: string;
}

export interface IMarket extends Document {
  name: string;
  slug: string;
  code: string;
  type: 'public' | 'individual';
  ownerId?: Types.ObjectId;
  description: string;
  location: ILocation;
  operatingHours: {
    open: string;
    close: string;
    daysOpen: string[];
  };
  isActive: boolean;
  totalSellers: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export const MarketSchema = new Schema<IMarket>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    code: { type: String, required: true },
    type: { type: String, enum: ['public', 'individual'], required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
    description: { type: String },
    location: {
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number], index: '2dsphere', required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    operatingHours: {
      open: { type: String, default: '06:00' },
      close: { type: String, default: '18:00' },
      daysOpen: { type: [String], default: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    },
    isActive: { type: Boolean, default: true },
    totalSellers: { type: Number, default: 0 },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);
