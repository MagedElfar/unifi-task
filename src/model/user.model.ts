import { Service } from "typedi";
import { setError } from "../utils/error-format";
import { Schema, model, Document, Types } from 'mongoose';
import BaseRepository from "../plugins/mongoDB";

export interface IUser extends Document {
    _id: Types.ObjectId,
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    _id: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export const UserModel = model<IUser>('User', userSchema);


@Service()
export class UserRepository extends BaseRepository<IUser>{
    constructor() {
        super(UserModel)
    }
}
