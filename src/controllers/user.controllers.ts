import Controller, { APIRoute } from "../app/controller";
import { Request, Response, NextFunction } from "express";
import routes from "../route/_user.routes";
import UserServices from "../services/user.services";
import { Inject } from "typedi";

export default class UserController extends Controller {
    protected routes: APIRoute[];
    private readonly userServices: UserServices;

    constructor(
        path: string,
        @Inject() userServices: UserServices,

    ) {
        super(path);
        this.userServices = userServices;
        this.routes = routes(this);
    }

    async getUserHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const { password: pass, ...user } = req.user!

            super.setResponseSuccess({
                res, status: 200,
                data: {
                    user
                }
            })

        } catch (error) {
            next(error)
        }
    };
}
