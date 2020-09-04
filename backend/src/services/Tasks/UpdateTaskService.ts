import { getCustomRepository } from 'typeorm';
import { startOfMinute, isBefore } from 'date-fns';

import Task from '../../models/Task';
import AppError from '../../errors/AppError';
import TaskRepository from '../../repositories/TaskRepository';

interface Request {
    id: string,
    title: string,
    user_id: string,
    description: string,
    type: string,
    delivery_date: Date,
}

class UpdateTaskService {
    public async execute({ id, title, user_id, description, type, delivery_date }: Request): Promise<Task> {
        const taskRepository = getCustomRepository(TaskRepository);

        taskRepository.validationDeliveryDate(delivery_date);

        await taskRepository.findById(id);

        const taskDate = startOfMinute(delivery_date);


        const task = await taskRepository.save({
            id: id,
            title,
            user_id,
            description,
            type,
            delivery_date: taskDate,
        })

        return task;
    }
}

export default UpdateTaskService;
