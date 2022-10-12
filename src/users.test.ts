import {describe, expect, test,} from "vitest";
import { Users } from './users'
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

describe('users', () => {
    test("is a Users instance", () => {
        // @ts-ignore
        const users = new Users(client.user);
        expect(users).toBeInstanceOf(Users);
    })
})
