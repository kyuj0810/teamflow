import { prisma } from '../lib/prisma';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export const createUserService = async (data: CreateUserDto) => {
  return prisma.user.create({
    data,
  });
};

export const updateUserService = async (id: string, data: UpdateUserDto) => {
  // 존재 여부 확인
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    throw new Error('존재하지 않는 사용자입니다.');
  }

  return prisma.user.update({
    where: { id },
    data,
  });
};
