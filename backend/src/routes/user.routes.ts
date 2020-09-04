import { Router } from 'express';

import CreateUserService from '../services/Users/CreateUserService';

const userRouter = Router();

userRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
        name,
        email,
        password,
    });

    delete user?.password;

    return response.json(user);

})

export default userRouter;
