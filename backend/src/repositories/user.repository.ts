import { User } from '../database/models/User';
import { UpdateUserDTO } from '../dtos/user.dto';

export function findUserById(id: string) {
  return User.findByPk(id, {
    attributes: ['id', 'name', 'email', 'age', 'height', 'weight', 'gender', 'createdAt'],
  });
}

export async function updateUser(user: User, payload: UpdateUserDTO) {
  return user.update(payload);
}
