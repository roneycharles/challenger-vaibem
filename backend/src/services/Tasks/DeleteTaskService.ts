import { getCustomRepository } from 'typeorm';

import Task from '../../models/Task';
import TaskRepository from '../../repositories/TaskRepository'
import AppError from '../../errors/AppError'

interface Request {
    id: string;
    deleted_at: Date;
}

class DeleteTaskService {
    public async execute({ id, deleted_at }: Request): Promise<Task> {
        const taskRepository = getCustomRepository(TaskRepository);

        const findTask = taskRepository.findById(id);

        if(!findTask) {
            throw new AppError('Tarefa inexistente.');
        }

        const task = await taskRepository.save({
            id: id,
            deleted_at: new Date(),
        })
        return task;
    }
}
export default DeleteTaskService;
