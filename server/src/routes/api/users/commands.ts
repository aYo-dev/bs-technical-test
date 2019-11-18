import { validate } from 'class-validator';
import { Context, Middleware } from 'koa';
import { assign, flowRight, map } from 'lodash';

import { UserMerger } from '../../../services/user-merger.service';
import {
    AddQualification,
    CreateUser,
    DeleteQualification,
    DeleteUser,
    MergeUsers,
    UpdateName,
    User,
    UserRepository,
} from '../../../services/user-repository.service';


function checkedCommand<T>(type: new() => T, action: (body: T) => any): Middleware {
    return async (ctx, next) => {
        const cleanedBody = new type();

        assign(cleanedBody, ctx.request.body);

        const errors = await validate(cleanedBody, {
            whitelist: true,
            forbidNonWhitelisted: true,
            forbidUnknownValues: true,
        });

        if (errors.length > 0) {
            ctx.status = 400;
            ctx.body = errors;
        }
        else {
            ctx.status = 200;
            action(cleanedBody);
        }
    };
}

function createUser(ctx: Context, cmd: CreateUser) {
    const users = ctx.injector.get(UserRepository);
    const user = users.create(cmd);

    ctx.status = 201;
    ctx.set('Location', `/api/users/${user.id}`);
}

function mergeUsers(ctx: Context, cmd: MergeUsers) {
    const userRepo = ctx.injector.get(UserRepository);
    const mergeService = ctx.injector.get(UserMerger);
    // Get the users
    const users =
        map(cmd.ids, (id) => userRepo.get(id))
        .filter((el) => !!el);

    if (users.length >= 2) {
        const merge = flowRight([
            userRepo.create.bind(userRepo),
            mergeService.merge.bind(mergeService),
        ]);

        // merge users and insert the new one
        const newUser = merge(users as User[]);
        // finaly delete the merged users
        map(users, (u) => userRepo.delete(u as User));

        ctx.status = 200;
        ctx.body = newUser;
        ctx.set('Location', `/api/users/commands`);

        return;
    }

    ctx.status = 400;
    ctx.set('Location', `/api/users/commands`);
}


export function commands(): Middleware {
    return async (ctx, next) => {
        const users = ctx.injector.get(UserRepository);

        const contentTypeToCommand: {
            [contentType: string]: Middleware,
        } = {
            'application/vnd.in.biosite.create-user+json':
                checkedCommand(CreateUser, (cmd: CreateUser) => createUser(ctx, cmd)),
            'application/vnd.in.biosite.delete-user+json':
                checkedCommand(DeleteUser, (cmd: DeleteUser) => users.delete(cmd)),
            'application/vnd.in.biosite.update-user-name+json':
                checkedCommand(UpdateName, (cmd: UpdateName) => users.updateName(cmd)),
            'application/vnd.in.biosite.add-qualification+json':
                checkedCommand(AddQualification, (cmd: AddQualification) => users.addQualification(cmd)),
            'application/vnd.in.biosite.delete-qualification+json':
                checkedCommand(DeleteQualification, (cmd: DeleteQualification) => users.deleteQualification(cmd)),
            'application/vnd.in.biosite.merge-users+json':
                checkedCommand(MergeUsers, (cmd: MergeUsers) => mergeUsers(ctx, cmd)),
        };

        const contentType: string = ctx.request.headers['content-type'];

        if (contentTypeToCommand.hasOwnProperty(contentType)) {
            contentTypeToCommand[contentType](ctx, next);
        }
        else {
            ctx.status = 400;
            ctx.body = {
                message: `unsupported content type: ${contentType}`,
            };
        }
    };
}
