import shortid from 'shortid';
import debug from 'debug';
import mongooseService from '../../common/services/mongoose.service';

import { CreateUserDTO } from '../dto/create.user.dto';
import { PutUserDTO } from '../dto/put.user.dto';
import { PatchUserDTO } from '../dto/patch.user.dto';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
    Schema = mongooseService.getMongoose().Schema;

    userSchema = new this.Schema({
        _id: String,
        email: String,
        password: { type: String, select: false },
        firstName: String,
        lastName: String,
        permissionFlags: Number
    }, { id: false });

    User = mongooseService.getMongoose().model('Users', this.userSchema);

    constructor() {
        log('Created new instance of UsersDao');
    }

    async addUser(createUserDTO: CreateUserDTO) {
        const userId = shortid.generate();
        const user = new this.User({
            _id: userId,
            ...createUserDTO,
            permissionFlags: 1
        });

        await user.save();
        return userId;
    }

    async getUserByEmail(email: string) {
        return this.User.findOne({ email }).exec();
    }

    async getUserByEmailWithPassword(email: string) {
        return this.User
            .findOne({ email })
            .select('_id email permissionFlags +password')
            .exec();
    }

    async getUserById(userId: string) {
        return this.User.findOne({ _id: userId }).populate('User').exec();
    }

    async getUsers(limit = 25, page = 0) {
        return this.User.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    async updateUserById(userId: string, userDTO: PatchUserDTO | PutUserDTO) {
        return await this.User.findOneAndUpdate(
            { _id: userId },
            { $set: userDTO },
            { new: true }
        ).exec();
    }

    async removeUserById(userId: string) {
        return this.User.deleteOne({ _id: userId }).exec();
    }
}

export default new UsersDao();