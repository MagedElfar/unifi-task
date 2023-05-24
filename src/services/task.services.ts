import { Service, Inject } from "typedi";
import { ITask, TaskRepository, TaskStatus } from "../model/task.model";
import { CreateTaskDto, UpdateTaskDto } from "../dto/task.dto";
import { setError } from "../utils/error-format";
import { Types } from "mongoose";

@Service()
export default class TaskServices {
    private readonly taskRepo: TaskRepository;


    constructor(@Inject() taskRepo: TaskRepository) {
        this.taskRepo = taskRepo;
    }


    async create(data: CreateTaskDto) {
        try {
            return await this.taskRepo.create(data);
        } catch (error) {
            throw error;
        }
    }

    async findAll(user: Types.ObjectId) {
        return await this.taskRepo.findAll({ user })
    }

    async findOne(data: Partial<ITask>) {
        return await this.taskRepo.findOne(data)
    }

    //add the fifth functionality (Get All)
    async findTask(id: string) {
        try {
            const task = await this.taskRepo.findById(id);

            if (!task) throw setError(404, "task not found");

            return task;
        } catch (error) {
            throw error
        }
    }

    async updateTask(id: string, data: UpdateTaskDto) {
        try {
            return await this.taskRepo.update(id, data)
        } catch (error) {
            throw error
        }
    }

    async deleteTask(id: string) {
        try {
            await this.taskRepo.delete(id);

            return;
        } catch (error) {
            throw error
        }
    }

}
