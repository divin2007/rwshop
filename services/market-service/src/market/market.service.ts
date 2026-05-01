import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMarket } from '@ruralmart/database';
import { CreateMarketDto } from './dto/create-market.dto';

@Injectable()
export class MarketService {
  constructor(
    @InjectModel('Market') private readonly marketModel: Model<IMarket>,
  ) {}

  async create(createMarketDto: CreateMarketDto): Promise<IMarket> {
    const createdMarket = new this.marketModel(createMarketDto);
    return createdMarket.save();
  }

  async findAll(): Promise<IMarket[]> {
    return this.marketModel.find({ isActive: true, deletedAt: null }).exec();
  }

  async findBySlug(slug: string): Promise<IMarket> {
    const market = await this.marketModel
      .findOne({ slug, deletedAt: null })
      .exec();
    if (!market) {
      throw new NotFoundException(`Market with slug ${slug} not found`);
    }
    return market;
  }

  async findById(id: string): Promise<IMarket> {
    const market = await this.marketModel.findById(id).exec();
    if (!market || market.deletedAt) {
      throw new NotFoundException('Market not found');
    }
    return market;
  }
}
