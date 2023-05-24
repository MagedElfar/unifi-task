import { Container } from 'typedi';
import Controller from "../app/controller";
import AuthController from "../controllers/auth.controllers";
import UserController from '../controllers/user.controllers';
import AuthServices from "../services/auth.services";
import UserServices from '../services/user.services';
import TaskController from '../controllers/task.controllers';
import TaskServices from '../services/task.services';

const routes: Controller[] = [
    new AuthController(
        "",
        Container.get(AuthServices)
    ),

    new UserController(
        "/users",
        Container.get(UserServices),
    ),

    new TaskController(
        "/tasks",
        Container.get(TaskServices),
    )
]

export default routes