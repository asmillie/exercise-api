import dotenv from 'dotenv';

const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}

import express, { Application, Request, Response } from 'express';
import * as http from 'http';
import { Server } from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';

import { CommonRoutesConfig } from './common/common.routes.config';
import { AuthRoutes } from './auth/auth.routes.config';
import { UsersRoutes } from './users/users.routes.config';

const app: Application = express();
const server: Server = http.createServer(app);
const port = 3000;

const routes: Array<CommonRoutesConfig> = [];

const debugLog: debug.IDebugger = debug('app');

app.use(express.json());
app.use(cors());

// Configure Winston Logging
const loggerOpts: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    // When not debugging log requests on one-line
    loggerOpts.meta = false;
}

app.use(expressWinston.logger(loggerOpts));

routes.push(new AuthRoutes(app));
routes.push(new UsersRoutes(app));

const serverRunMessage = `Server running @ http://localhost:${port}`;

app.get('/', (req: Request, res: Response) => {
    res.status(200).send(serverRunMessage);
});

server.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
    })

    console.log(serverRunMessage)
});