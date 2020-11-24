import { getRepository } from "typeorm";
import { compare } from 'bcryptjs';

import User from "../models/User";

interface Request {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<{ user: User }> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email }
    });

    if (!user) {
      throw new Error('User not found. Email or password is incorrect.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('User not found. Email or password is incorrect.');
    }

    return { user };
  }
}

export default AuthenticateUserService;
