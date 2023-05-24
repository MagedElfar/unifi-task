import Controller, { APIRoute, Methods } from '../app/controller';
import authorizationMiddleware from '../middleware/authorization.middleware';
import {
    signupSchema,
    loginSchema,
} from '../utils/_aut-validation-schema';
import validation from "../middleware/validation.middleware"

const routes: (controller: Controller) => APIRoute[] = (controller: any) => {

    const r: APIRoute[] = [
        {
            path: "/login",
            method: Methods.POST,
            handler: controller.loginHandler,
            localMiddleware: [validation(loginSchema)],
            auth: false
        },

        {
            path: "/signup",
            method: Methods.POST,
            handler: controller.signupHandler,
            localMiddleware: [validation(signupSchema)],
            auth: false
        }
    ]
    return r;
}


export default routes