import { ProfileImageRepository } from './../model/profileImage.model';
import { Inject, Service } from "typedi";
import { setError } from '../utils/error-format';

@Service()
export default class ProfileImageServices {
    private readonly profileImageRepo: ProfileImageRepository;

    constructor(

        @Inject() profileImageRepo: ProfileImageRepository,
    ) {
        this.profileImageRepo = profileImageRepo;
    }


    async userImage(image_url: string, userId: number) {
        try {
            const userImg = await this.profileImageRepo.findOne({ userId });


            if (userImg) {


            } else {

                return await this.profileImageRepo.create({
                    userId,
                    image_url: " storageData.secure_url",
                    storage_key: "storageData.public_id"
                })
            }
        } catch (error) {
            throw error;
        }
    }

    async delEteUserImage(userId: number) {
        try {
            const userImg = await this.profileImageRepo.findOne({ userId });

            if (!userImg) throw setError(404, "not found")


            await this.profileImageRepo.delete(userImg.id)

        } catch (error) {
            throw error;
        }
    }

}
