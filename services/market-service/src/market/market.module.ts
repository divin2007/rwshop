import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketSchema } from '@ruralmart/database';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Market', schema: MarketSchema }]),
  ],
  controllers: [MarketController],
  providers: [MarketService],
  exports: [MarketService],
})
export class MarketModule {}
