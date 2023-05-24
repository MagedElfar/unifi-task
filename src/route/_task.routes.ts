import Controller, { APIRoute, Methods } from '../app/controller';
import TaskPermission from '../middleware/task-permissions.middleware';
import validation from "../middleware/validation.middleware"
import { paramSchema } from '../utils/_commen-validation-schema';
import {
    createTaskSchema,
    updateTaskSchema,
} from '../utils/_task-validation-schema';

const routes: (controller: Controller) => APIRoute[] = (controller: any) => {

    const r: APIRoute[] = [

        {
            path: "/",
            method: Methods.POST,
            handler: controller.createTaskHandler,
            localMiddleware: [
                validation(createTaskSchema),
            ],
            auth: true
        },

        {
            path: "/",
            method: Methods.GET,
            handler: controller.getTasksHandler,
            localMiddleware: [],
            auth: true
        },

        {
            path: "/:id",
            method: Methods.GET,
            handler: controller.getTaskHandler,
            localMiddleware: [
                validation(paramSchema, "param"),
                TaskPermission.PrivateTak
            ],
            auth: true
        },

        {
            path: "/:id",
            method: Methods.PUT,
            handler: controller.updateTaskHandler,
            localMiddleware: [
                validation(paramSchema, "param"),
                TaskPermission.PrivateTak,
                validation(updateTaskSchema)
            ],
            auth: true
        },

        {
            path: "/:id",
            method: Methods.DELETE,
            handler: controller.deleteTaskHandler,
            localMiddleware: [
                validation(paramSchema, "param"),
                TaskPermission.PrivateTak,
            ],
            auth: true
        },

    ]
    return r;
}


export default routes