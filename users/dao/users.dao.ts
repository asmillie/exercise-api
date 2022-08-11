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

    
}

export default new UsersDao();