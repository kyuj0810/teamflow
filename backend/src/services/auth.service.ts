import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';
import { signToken } from 'src/utils/jwt';
import { BadRequestError } from 'src/errors/bad-request.error';
import { LoginUserDto } from 'src/dto/login-user.dto';

export const loginService = async (data: LoginUserDto) => {
  const user = await prisma.user.findFirst({
    where: { email: data.email, deletedAt: null },
  });

  if (!user) {
    throw new BadRequestError('이메일 또는 비밀번호가 올바르지 않습니다.');
  }

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new BadRequestError('이메일 또는 비밀번호가 올바르지 않습니다.');
  }

  const token = signToken({ userId: user.id });

  return { accessToken: token };
};
