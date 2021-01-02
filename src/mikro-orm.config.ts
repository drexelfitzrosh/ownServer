import { Post } from "./enteties/Post";
import { MikroORM } from '@mikro-orm/core'
import path from 'path'


export default {
    migrations: {
        path: path.join(__dirname, './migrations'), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Post],
    dbName: 'reddit',
    type: 'postgresql',
    debug: process.env.NODE_ENV !== 'production'
} as Parameters<typeof MikroORM.init>[0];