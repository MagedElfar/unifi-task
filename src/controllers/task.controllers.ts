import Controller, { APIRoute } from "../app/controller";
import { Request, Response, NextFunction } from "express";
import routes from "../route/_task.routes";
import { Inject } from "typedi";
import TaskServices from "../services/task.services";



export default class TaskController extends Controller {
    protected routes: APIRoute[];
    private readonly taskServices: TaskServices;

    constructor(
        path: string,
        @Inject() taskServices: TaskServices,
    ) {
        super(path);
        this.routes = routes(this);
        this.taskServices = taskServices;
    }


    async createTaskHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const user = req.user?._id!;


            const task = await this.taskServices.create({
                ...req.body,
                user
            })

            super.setResponseSuccess({
                res,
                status: 201,
                data: { task }
            })

        } catch (error) {
            next(error)
        }
    };

    async getTasksHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const id = req.user?._id

            const tasks = await this.taskServices.findAll(id!)

            super.setResponseSuccess({
                res,
                status: 200,
                data: { tasks }
            })

        } catch (error) {
            next(error)
        }
    };

    async getTaskHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const { id } = req.params

            const task = await this.taskServices.findTask(id)

            super.setResponseSuccess({
                res,
                status: 200,
                data: { task }
            })

        } catch (error) {
            next(error)
        }
    };

    async updateTaskHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const { id } = req.params

            const task = await this.taskServices.updateTask(id, req.body)

            super.setResponseSuccess({
                res,
                status: 200,
                data: { task }
            })

        } catch (error) {
            next(error)
        }
    };

    async deleteTaskHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const { id } = req.params

            await this.taskServices.deleteTask(id)

            super.setResponseSuccess({
                res,
                status: 200,
                message: "task is deleted successfully"
            })

        } catch (error) {
            next(error)
        }
    };
}
