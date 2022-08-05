import {  Application } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import UsersController from './controllers/users.controller';
import UsersMiddleware from './middleware/users.middleware';
// TODO: Continue with Part 3: https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-3
export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes(): Application {

        this.app.route('/users')
            .get(UsersController.listUsers)
            .post(
                UsersMiddleware.validateRequiredUserBodyFields,
                UsersMiddleware.validateUniqueEmail,
                UsersController.createUser
            );

        this.app.param('userId', UsersMiddleware.addUserIdToRequestBody);

        this.app.route('/users/:userId')
            .all(UsersMiddleware.validateUserExists)
            .get(UsersController.getUserById)
            .delete(UsersController.removeUser);

        this.app.put('/users/:userId', [
            UsersMiddleware.validateRequiredUserBodyFields,
            UsersMiddleware.validateEmailBelongsToUser,
            UsersController.put
        ]);

        this.app.patch('/users/:userId', [
            UsersMiddleware.validatePatchEmail,
            UsersController.patch
        ]);

        return this.app;
    }
}
