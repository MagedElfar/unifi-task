import { UserRepository, IUser } from './../model/user.model';
import { Inject, Service } from "typedi";
import { setError } from '../utils/error-format';
import { CreateUserDto } from '../dto/user.dto';

@Service()
export default class UserServices {
    private readonly userRepo: UserRepository;

    constructor(
        @Inject() userRepo: UserRepository,
    ) {
        this.userRepo = userRepo;
    }

    async findOne(data: Partial<IUser>) {
        try {
            return await this.userRepo.findOne(data);
        } catch (error) {
            throw error
        }
    }


    async findUser(id: string) {
        try {
            const user = await this.userRepo.findById(id);

            if (!user) throw setError(404, "user not found");

            return user;
        } catch (error) {
            throw error
        }
    }



    async create(data: CreateUserDto) {
        try {
            return await this.userRepo.create(data);
        } catch (error) {
            throw error;
        }
    }
}
