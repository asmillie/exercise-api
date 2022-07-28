import shortid from 'shortid';
import debug from 'debug';

import { CreateUserDTO } from '../dto/create.user.dto';
import { PutUserDTO } from '../dto/put.user.dto';
import { PatchUserDTO } from '../dto/patch.user.dto';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
    users: Array<CreateUserDTO> = [];

    constructor() {
        log('Created new instance of UsersDao');
    }

    async addUser(user: CreateUserDTO) {
        user.id = shortid.generate();
        this.users.push(user);
        return user.id;
    }

    async getUsers() {
        return this.users;
    }

    async getUserById(userId: string) {
        return this.users.find((user: { id: string }) => user.id === userId);
    }

    async getUserByEmail(email: string) {
        const objIndex = this.users.findIndex(
            (obj: { email: string }) => obj.email === email
        );

        let currentUser = this.users[objIndex];
        if (currentUser) {
            return currentUser;
        } else {
            return null;
        }
    }

    async putUserById(userId: string, user: PutUserDTO) {
        const objIndex = this.users.findIndex(
            (obj: { id: string }) => obj.id === userId
        );
        this.users.splice(objIndex, 1, user);
        return `${user.id} updated via put`;
    }

    async patchUserById(userId: string, user: PatchUserDTO) {
        const objIndex = this.users.findIndex(
            (obj: { id: string }) => obj.id === userId
        );
        
        let currentUser = this.users[objIndex];
        const allowedPatchFields = [
            'password',
            'firstName',
            'lastName',
            'permissionLevel'
        ];

        for (let field of allowedPatchFields) {
            if (field in user) {
                // @ts-ignore
                currentUser[field] = user[field];
            }
        }

        this.users.splice(objIndex, 1, currentUser);

        return `${user.id} patched`;
    }

    async removeUserById(userId: string) {
        const objIndex = this.users.findIndex(
            (obj: { id: string }) => obj.id === userId
        );
        this.users.splice(objIndex, 1);
        return `${userId} removed`;
    }
}

export default UsersDao;