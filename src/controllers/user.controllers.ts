import Controller, { APIRoute } from "../app/controller";
import { Request, Response, NextFunction } from "express";
import routes from "../route/_user.routes";
import UserServices from "../services/user.services";
import { Inject } from "typedi";
import ProfileImageServices from "../services/profileImage.services";

export default class UserController extends Controller {
    protected routes: APIRoute[];
    private readonly userServices: UserServices;
    private readonly profileImageService: ProfileImageServices;

    constructor(
        path: string,
        @Inject() userServices: UserServices,
        @Inject() profileImageService: ProfileImageServices

    ) {
        super(path);
        this.userServices = userServices;
        this.profileImageService = profileImageService
        this.routes = routes(this);
    }


    async createUserProfileHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const id = req.user?.id;

            super.setResponseSuccess({
                res,
                status: 201,
                message: "user profile are created"
            })

        } catch (error) {
            next(error)
        }
    };

    async userImageHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const id = req.user?.id;


            super.setResponseSuccess({
                res,
                status: 200,
            })

        } catch (error) {
            next(error)
        }
    };

    async deleteUserImageHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const id = req.user?.id;

            await this.profileImageService.delEteUserImage(id!)

            super.setResponseSuccess({
                res,
                status: 200,
            })

        } catch (error) {
            next(error)
        }
    };

    async getUserHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const id = req.user?.id;

            const data = await this.userServices.findOne({ id });

            const { password: pass, ...user } = data

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


    async getUsersHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const id = req.user?.id;

            const query = req.query

            const users = await this.userServices.findUsers(query);

            super.setResponseSuccess({
                res, status: 200,
                data: {
                    users
                }
            })

        } catch (error) {
            next(error)
        }
    };

    async updateUserHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const id = req.user?.id;

            const { username, email, ...profile } = req.body;

            const { password, ...user } = await this.userServices.update(id!, { username, email })

            super.setResponseSuccess({ res, status: 200, message: "user updated successfully", data: { user } })

        } catch (error) {
            next(error)
        }
    };

    async changePasswordHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const id = req.user?.id;


            await this.userServices.changePassword(+id!, req.body)

            super.setResponseSuccess({ res, status: 200, message: "user password updated successfully" })

        } catch (error) {
            next(error)
        }
    };
}
