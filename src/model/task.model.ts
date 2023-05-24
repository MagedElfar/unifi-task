import { Service } from "typedi";
import { setError } from "../utils/error-format";
import { Schema, model, Document, Types } from 'mongoose';
import BaseRepository from "../plugins/mongoDB";
import { IUser } from "./user.model";

export enum TaskStatus {
    TO_DO = "to do",
    IN_PROGRESS = "in progress",
    IN_REVIEW = "in review",
    DONE = "done",
    BLOCKED = "blocked"
}

export interface ITask extends Document {
    _id: Types.ObjectId,
    name: string;
    description: string;
    status: TaskStatus;
    user: Types.ObjectId | IUser;
}

const taskSchema = new Schema<ITask>({
    _id: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
    name: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: Object.values(TaskStatus), default: TaskStatus.TO_DO },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

export const TaskModel = model<ITask>('Task', taskSchema);


@Service()
export class TaskRepository extends BaseRepository<ITask>{
    constructor() {
        super(TaskModel)
    }
}

