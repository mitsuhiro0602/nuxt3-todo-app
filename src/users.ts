import { Prisma } from '@prisma/client'
import Joi from "joi";
import { v4 as uuid } from 'uuid'
import * as bcrypt from 'bcrypt'
export interface UsersAddOptions {
    email: string,
    password: string,
    passwordConfirm: string
}

const usersAddOptionsSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    passwordConfirm: Joi.string().valid(Joi.ref('password')).required()
}).required()

export interface UsersLoginOptions {
    email: string,
    password: string,
}

const userLoginOptionsSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
}).required()

export class Users {
    declare UserModel: Prisma.UserDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;
    constructor(UserModel: Prisma.UserDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>) {
        this.UserModel = UserModel;
    }

    static async hashPassword(password: string) {
        return bcrypt.hash(password, 10);
    }

    static async isValidPassword(password: string, hash: string) {
        return bcrypt.compare(password, hash);
    }

    // @ts-ignore
    async add (options: UsersAddOptions): Promise<User> {
        const params = (await usersAddOptionsSchema.validateAsync(options)) as UsersAddOptions
        const hashedPassword = await Users.hashPassword(params.password)
        const id = uuid();
        return this.UserModel.create({
        // @ts-ignore
            id,
            email: params.email,
            password: hashedPassword
        })
    }
    async login (options: UsersLoginOptions) {
        const params = (await userLoginOptionsSchema .validateAsync(
            options
        )) as UsersLoginOptions

        const user = await this.UserModel.findUnique({
            where: {
                email: params.email,
            },
        });

        if(!user) {
            return undefined;
        }

        if(!Users.isValidPassword(params.password, user.password)) {
            return undefined;
        }



        if(!user) {
            return undefined
        }
    }
}
