import { setError } from "../utils/error-format";
import mongoose, { Document, FilterQuery, Model, Types } from 'mongoose';
import config from '../config';

//mongo db connection
export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(config.db.url!);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default abstract class BaseRepository<T extends Document> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model
    }
    async create(data: Partial<T>): Promise<T> {
        return (await this.model.create(data)).toObject();
    }

    async findById(id: string): Promise<T | null> {

        if (!Types.ObjectId.isValid(id)) {
            throw setError(400, 'Invalid id');
        }
        const objectId = new Types.ObjectId(id);

        return this.model.findById(objectId).lean();
    }

    async findOne(data: Partial<T>): Promise<T | null> {
        return this.model.findOne(data as FilterQuery<T>).lean();
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {

        const objectId = new Types.ObjectId(id);

        return this.model.findByIdAndUpdate(objectId, data, { new: true }).exec();
    }

    async delete(id: string): Promise<T | null> {
        const objectId = new Types.ObjectId(id);

        return this.model.findByIdAndDelete(objectId).lean();
    }

    async findAll(data?: Partial<T>): Promise<T[]> {
        if (data) return this.model.find(data as FilterQuery<T>).lean();

        return this.model.find().lean();

    }
}