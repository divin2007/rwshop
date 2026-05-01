import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateSellerDto } from './dto/create-seller.dto';

@Injectable()
export class SellerService {
  constructor(
    @InjectModel('SellerProfile') private readonly sellerModel: Model<any>,
  ) {}

  async create(createSellerDto: CreateSellerDto): Promise<any> {
    const createdSeller = new this.sellerModel({
      userId: new Types.ObjectId(createSellerDto.userId),
      marketId: new Types.ObjectId(createSellerDto.marketId),
      stallId: createSellerDto.stallId,
      stallName: createSellerDto.stallName,
      description: createSellerDto.description,
      isApproved: false,
      rating: 0,
      totalSales: 0,
      businessPermitUrl: createSellerDto.businessPermitUrl,
      idCardUrl: createSellerDto.idCardUrl,
      stallPhotoUrl: createSellerDto.stallPhotoUrl,
    });
    return createdSeller.save();
  }

  async findAll(): Promise<any[]> {
    return this.sellerModel.find().exec();
  }

  async findOne(id: string): Promise<any> {
    const seller = await this.sellerModel.findById(id).exec();
    if (!seller) {
      throw new NotFoundException(`Seller with ID ${id} not found`);
    }
    return seller;
  }

  async findByUserId(userId: string): Promise<any[]> {
    return this.sellerModel.find({ userId: new Types.ObjectId(userId) }).exec();
  }

  async findByMarketId(marketId: string): Promise<any[]> {
    return this.sellerModel
      .find({ marketId: new Types.ObjectId(marketId) })
      .exec();
  }

  async update(id: string, updateData: Partial<any>): Promise<any> {
    const updatedSeller = await this.sellerModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updatedSeller) {
      throw new NotFoundException(`Seller with ID ${id} not found`);
    }
    return updatedSeller;
  }

  async remove(id: string): Promise<any> {
    const deletedSeller = await this.sellerModel.findByIdAndDelete(id).exec();
    if (!deletedSeller) {
      throw new NotFoundException(`Seller with ID ${id} not found`);
    }
    return deletedSeller;
  }
}
