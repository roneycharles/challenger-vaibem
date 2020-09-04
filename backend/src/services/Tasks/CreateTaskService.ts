import { getRepository } from 'typeorm';
import { isBefore, startOfMinute } from 'date-fns';

import AppError from '../../errors/AppError';
import Task from '../../models/Task';

interface Request {
    title: string;
    user_id: string;
    description: string;
    type: string;
    delivery_date: Date;
}

class CreateTaskService {
    public async execute({title, user_id, description, type, delivery_date}: Request): Promise<Task> {
        const taskRepository = getRepository(Task);

        const taskDate = startOfMinute(delivery_date);

        var date = new Date();

        const findDateByPast = isBefore(delivery_date, date)

        if (findDateByPast) {
            throw new AppError('Data não pode ser anterior à data atual');
        }

        const task = taskRepository.create({
            title,
            user_id,
            description,
            type,
            delivery_date: taskDate,
        });

        await taskRepository.save(task);

        return task;

    }
}

export default CreateTaskService;
