import Controller, { APIRoute } from "../app/controller";
import { Request, Response, NextFunction } from "express"
import routes from "../route/_auth.routes";
import AuthServices from "../services/auth.services";
import { Inject } from "typedi";
import config from "../config";


export default class AuthController extends Controller {
    protected routes: APIRoute[] = routes(this);
    private readonly authServices: AuthServices


    constructor(path: string, @Inject() authServices: AuthServices) {
        super(path);
        this.authServices = authServices
    }

    async loginHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {


            const user = await this.authServices.login(req.body);

            super.setResponseSuccess({
                res,
                status: 200,
                data: user
            });

        } catch (error) {
            next(error)
        }
    };

    async signupHandler(req: Request, res: Response, next: NextFunction) {
        try {

            const { token } = req.query


            const user = await this.authServices.signup(req.body)


            super.setResponseSuccess({
                res,
                status: 201,
                message: "new user signup",
                data: user
            });

        } catch (error) {
            next(error)
        }
    }
} 