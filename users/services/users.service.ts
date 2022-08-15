import UsersDao from '../dao/users.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateUserDTO } from '../dto/create.user.dto';
import { PutUserDTO } from '../dto/put.user.dto';
import { PatchUserDTO } from '../dto/patch.user.dto';
// TODO: https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-3
// Adding express-validator
class UsersService implements CRUD {
    async create(resource: CreateUserDTO) {
        return UsersDao.addUser(resource);
    }

    async deleteById(id: string): Promise<any> {
        return UsersDao.removeUserById(id);
    }

    async list(limit: number, page: number) {
        return UsersDao.getUsers(limit, page);
    }

    async patchById(id: string, resource: PatchUserDTO): Promise<any> {
        return UsersDao.updateUserById(id, resource);
    }

    async readById(id: string) {
        return UsersDao.getUserById(id);
    }

    async putById(id: string, resource: PutUserDTO): Promise<any> {
        return UsersDao.updateUserById(id, resource);
    }

    async getUserByEmail(email: string) {
        return UsersDao.getUserByEmail(email);
    }    
}

export default new UsersService();