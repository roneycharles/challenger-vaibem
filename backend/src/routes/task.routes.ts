import { Router, request, response } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import constultAuthentication from '../middlewares/consultAuthentication';
import CreateTaskService from '../services/Tasks/CreateTaskService';
import TaskRepository from '../repositories/TaskRepository';
import UpdateTaskService from '../services/Tasks/UpdateTaskService';
import DeleteTaskService from '../services/Tasks/DeleteTaskService';
import ResporeTaskService from '../services/Tasks/RestoreTaskService';


const taskRouter = Router();

taskRouter.use(constultAuthentication)

taskRouter.post('/', async (request, response) => {
    const { title, user_id, description, type, delivery_date } = request.body;

    const parsedDate = parseISO(delivery_date);

    const createTask = new CreateTaskService();

    const task = await createTask.execute({
        title,
        user_id: request.user.id,
        description,
        type,
        delivery_date: parsedDate,
    });

    return response.json(task);
});

taskRouter.patch('/:id', async (request, response) => {
    const { title, description, type, delivery_date } = request.body
    const { id } = request.params
    const updateTask = new UpdateTaskService();

    const parsedDate = parseISO(delivery_date);

    const task = await updateTask.execute({
        id,
        title,
        user_id: request.user.id,
        description,
        type,
        delivery_date: parsedDate,
    })

    return response.json(task)
});

taskRouter.get('/', async (request, response) => {
    const taskRepository = getCustomRepository(TaskRepository);
    const tasks = await taskRepository.find();

    return response.json(tasks);
});

taskRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;

    const deleteTask = new DeleteTaskService();

    const task = await deleteTask.execute({
        id,
        deleted_at: new Date,
    });

    return response.json(task);
});

taskRouter.post('/:id', async (request, response) => {
    const { id } = request.params;

    const restoreTask = new ResporeTaskService();

    const task = await restoreTask.execute({
        id,
        deleted_at: new Date,
    })

    return response.json(task);
})

export default taskRouter;
