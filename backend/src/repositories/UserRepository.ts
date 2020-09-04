import { Repository, EntityRepository } from 'typeorm';

import User from '../models/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {
    findById(id: string) {
        return this.findOne({ id });
    }

    public async findByEmail(email: string): Promise<User | null> {
        const findUser = await this.findOne({
            where: { email },
        })

        return findUser || null;
    }
}

export default UserRepository;
