import { Request, Response, NextFunction } from "express";
import TaskServices from "../services/task.services";
import { setError } from "../utils/error-format";
import { Types } from "mongoose";
import Container from "typedi";



abstract class Permissions {

}

class TaskPermission {

    private static taskServices: TaskServices = Container.get(TaskServices);

    static PrivateTak = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user?._id;
            const { id } = req.params;
            const objectId = new Types.ObjectId(id);


            const task = await this.taskServices.findOne({
                user,
                _id: objectId
            })

            if (!task) throw setError(403, "Forbidden");

            next()

        } catch (error) {
            next(error)
        }
    }
}


export default TaskPermission