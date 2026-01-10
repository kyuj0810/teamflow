import { prisma } from '../lib/prisma';
import { CreateUserDto } from '../dto/create-user.dto';

export const createUserService = async (data: CreateUserDto) => {
  return prisma.user.create({
    data,
  });
};
