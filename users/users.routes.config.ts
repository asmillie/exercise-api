import express, { Request, Response, Application, NextFunction } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
//TODO: https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1 
// Configuring the Express.js Routes of the Users Endpoints
export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes(): Application {

        this.app.route('/users')
            .get((req: Request, res: Response) => {
                res.status(200).send('List of Users');
            })
            .post((req: Request, res: Response) => {
                res.status(200).send('Post to users');
            });

        this.app.route('/users/:userId')
            .all((req: Request, res: Response, next: NextFunction) => {
                // Middleware function that runs before all requests
                next();
            })
            .get((req: Request, res: Response) => {
                res.status(200).send(`GET request for id ${req.params.userId}`);
            })
            .put((req: Request, res: Response) => {
                res.status(200).send(`PUT request for id ${req.params.userId}`);
            })
            .patch((req: Request, res: Response) => {
                res.status(200).send(`Patch request for id ${req.params.userId}`);
            })
            .delete((req: Request, res: Response) => {
                res.status(200).send(`delete request for id ${req.params.userId}`);
            });

        return this.app;
    }
}
