import { z } from 'zod';

export const getUserQuerySchema = z.object({
  //coerce → 문자열을 숫자로 변환
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

export type GetUsersQueryDto = z.infer<typeof getUserQuerySchema>;
