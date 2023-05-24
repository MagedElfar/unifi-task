import { Types } from "mongoose";
import { TaskStatus } from "../model/task.model";

export class CreateTaskDto {
    name: string;
    description: string;
    user: Types.ObjectId
}

export class UpdateTaskDto {
    name?: string;
    description?: string;
    status?: TaskStatus
}