import { prisma } from '../lib/prisma';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { BadRequestError } from 'src/errors/bad-request.error';
import { NotFoundError } from 'src/errors/not-found.error';

export const createUserService = async (data: CreateUserDto) => {
  // 생성할 필드가 하나도 없을 때
  if (Object.keys(data).length === 0) {
    throw new BadRequestError('생성할 값이 없습니다.');
  }

  // 존재 여부 확인
  if (data.email) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new NotFoundError('이미 존재하는 Email 입니다.');
    }
  }

  return prisma.user.create({
    data,
  });
};

export const updateUserService = async (id: string, data: UpdateUserDto) => {
  // 업데이트할 필드가 하나도 없을 때
  if (Object.keys(data).length === 0) {
    throw new BadRequestError('업데이트할 값이 없습니다.');
  }

  if (data.email) {
    // 존재 여부 확인
    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing && existing.id !== id) {
      throw new NotFoundError('존재하지 않는 Email 입니다.');
    }
  }

  return prisma.user.update({
    where: { id },
    data,
  });
};

export const getUserByIdService = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new NotFoundError('존재하지 않는 사용자입니다.');
  }

  return user;
};

export const getUserService = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const [users, total] = await prisma.$transaction([
    prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.count(),
  ]);

  return {
    items: users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
