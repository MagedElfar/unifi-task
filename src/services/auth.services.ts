import { Inject, Service } from "typedi";
import { IUser } from './../model/user.model';
import { setError } from "../utils/error-format";
import UserServices from "./user.services";
import * as bcrypt from "bcrypt";
import TokenHelper from './jwt.services';
import JwtServices from './jwt.services';


@Service()
export default class AuthServices {
    private readonly userService: UserServices;
    private readonly tokenHelper: TokenHelper;

    constructor(
        @Inject() userService: UserServices,
        @Inject() tokenHelper: TokenHelper,
        @Inject() jwtServices: JwtServices,
    ) {
        this.userService = userService;
        this.tokenHelper = tokenHelper;
    }

    async signup(data: IUser) {
        try {


            let user = await this.userService.findOne({ email: data.email });

            if (user) throw setError(409, "email already exists")

            const hashedPassword = await bcrypt.hash(data.password, 10);

            user = await this.userService.create({
                ...data,
                password: hashedPassword
            })

            const { accessToken } = this.tokenHelper.authTokens({ id: user._id });

            const { password, ...others } = user
            return {
                user: others,
                accessToken,
            }

        } catch (error) {
            throw error
        }
    }


    async login(data: IUser) {
        try {
            const user = await this.userService.findOne({
                email: data.email
            })

            if (!user) throw setError(401, "Invalid Email Or Password");

            const isSame = await bcrypt.compare(data.password, user.password);

            if (!isSame) throw setError(401, "Invalid Email Or Password");

            const { accessToken } = this.tokenHelper.authTokens({ id: user._id });

            const { password, ...others } = user


            return {
                user: others,
                accessToken,
            }

        } catch (error) {
            throw error;
        }
    }
}