import { MikroORM } from '@mikro-orm/core'
import microOrmConfig from './mikro-orm.config'
import express from 'express'
import bodyParser from 'body-parser'


const main =async ()=>{
    const orm = await MikroORM.init(microOrmConfig)
    await orm.getMigrator().up()

    const app = express()

    app.use(bodyParser.json({
        limit: '50mb',
        verify(req: any, _, buf) {
            req.rawBody = buf;
        }
    }));

    app.get('/', (_, res)=>{
        res.send('hello world')
    })




    app.listen(4000, ()=> console.log('server listening to port: 4000'))
}

main()
