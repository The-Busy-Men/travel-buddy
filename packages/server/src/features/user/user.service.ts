import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/api/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userData: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }

  async getAllUsers() {
    const users = await this.userRepository.find({
      select: [
        'id',
        'email',
        'firstName',
        'lastName',
        'isActive',
        'address',
        'roles',
      ],
      relations: ['address'],
    });
    return users;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email: email });
    return user;
  }
}
