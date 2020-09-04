import { EntityRepository, Repository } from 'typeorm';

import Task from '../models/Task';
import { isBefore } from 'date-fns';
import AppError from '../errors/AppError';

@EntityRepository(Task)
class TaskRepository extends Repository<Task> {
    public async findByDate(date: Date): Promise<Task | null> {
        const findTask = await this.findOne({
            where: { date },
        })

        return findTask || null;
    }
    findById(id: string) {
        const findId = this.findOne({ id });

        if(!findId) {
            throw new AppError('Tarefa informada não existe')
        }

        return findId;
    }

    validationDeliveryDate(delivery_date: Date) {
        let date = new Date;

        const validateDate = isBefore(delivery_date, date);

        if (validateDate) {
            throw new AppError('Data não pode ser anterior à data atual');
        }

        return validateDate;
    }
}

export default TaskRepository;
