import { TaskStatus } from './../model/task.model';
import Joi from "joi";

const createTaskSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow("").required(),
})

const updateTaskSchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().allow("").optional(),
    status: Joi.string().optional().valid(...Object.values(TaskStatus)),
}).or("name", "description", "status");


export {
    createTaskSchema,
    updateTaskSchema
}