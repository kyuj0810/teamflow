import { z } from 'zod';
import { createUserSchema } from './create-user.dto';

// UpdateUserDto는 CreateUserDto의 모든 필드를 선택적으로 가짐
export const updateUserSchema = createUserSchema.partial();
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
