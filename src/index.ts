
import express from 'express'
import bodyParser from 'body-parser'
import { ORM } from './utils'
import post from './routes/post'
import user from './routes/user'



const main =async ()=>{
    const orm = await ORM()
    await orm.getMigrator().up()

    const app = express()

    app.use(bodyParser.json({
        limit: '50mb',
        verify(req: any, _, buf) {
            req.rawBody = buf;
        }
    }));

    app.use('/post', post)
    app.use('/auth', user)

    app.get('/', (_, res)=>{
        res.send('hello world')
    })




    app.listen(4000, ()=> console.log('server listening to port: 4000'))
}

main()
