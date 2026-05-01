import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '@ruralmart/database';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(createUserDto.password, salt);

    const createdUser = new this.userModel({
      ...createUserDto,
      passwordHash,
      security: { failedLoginAttempts: 0, twoFactorEnabled: false },
    });
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<IUser> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async incrementFailedLogins(email: string): Promise<void> {
    const user = await this.findByEmail(email);
    if (!user) return;

    user.security.failedLoginAttempts += 1;
    if (user.security.failedLoginAttempts >= 5) {
      // Lock account for 15 minutes
      user.security.lockedUntil = new Date(Date.now() + 15 * 60 * 1000);
    }
    await user.save();
  }

  async resetFailedLogins(email: string): Promise<void> {
    await this.userModel
      .updateOne(
        { email },
        {
          $set: {
            'security.failedLoginAttempts': 0,
            'security.lockedUntil': null,
            'security.lastLoginAt': new Date(),
          },
        },
      )
      .exec();
  }
}
