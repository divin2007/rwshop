import { Schema, Document } from 'mongoose';

export interface ILocation {
  type: string;
  coordinates: number[]; // [lng, lat]
  address: string;
  city: string;
}

export const MarketSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    code: { type: String, required: true },
    type: { type: String, enum: ['public', 'individual'], required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' }, // required if individual
    description: { type: String },
    location: {
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number], index: '2dsphere', required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    operatingHours: {
      open: { type: String },
      close: { type: String },
      daysOpen: { type: [String] },
    },
    isActive: { type: Boolean, default: true },
    totalSellers: { type: Number, default: 0 },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export const SellerProfileSchema = new Schema(
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
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export const RiderProfileSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    plateNumber: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    currentLocation: {
      lat: { type: Number },
      lng: { type: Number },
      updatedAt: { type: Date },
    },
    rating: { type: Number, default: 0 },
    totalDeliveries: { type: Number, default: 0 },
    rejectionRate: { type: Number, default: 0 },
    licenseUrl: { type: String },
    vehiclePhotoUrl: { type: String },
    idCardUrl: { type: String },
    insuranceUrl: { type: String },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);
