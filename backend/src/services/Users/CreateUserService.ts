import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../../errors/AppError';
import User from '../../models/User';
import UserRepository from '../../repositories/UserRepository';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password}: Request): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);

        const checkUserExist = await userRepository.findByEmail(email);

        if (checkUserExist) {
            throw new AppError('Uma conta já está usando esse email.')
        }

        const passwordHash = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            password: passwordHash,
        });

        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService;
