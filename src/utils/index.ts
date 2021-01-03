import { MikroORM } from "@mikro-orm/core"
import microOrmConfig from '../mikro-orm.config'
import Joi from 'joi'

export const ORM = async ()=>{
    const orm = await MikroORM.init(microOrmConfig)
    return orm
}

interface registerParams {
    name: string
    email: string
    password: string
}


export const registerValidation = async (data:registerParams) => {
    try {
        const schema = Joi.object({
            name: Joi.string().min(6).max(55).required(),
            email: Joi.string().required().email(),
            password: Joi.string().min(6).required()
        })
        const res = await schema.validateAsync(data)
        return {error: false, data: res}
    } catch (error) {
        return {error: true, message: error.details[0].message}
    }
}

interface loginParams {
    email: string
    password: string
}

export const loginValidation = async (data:loginParams) => {
    try {
        const schema = Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().min(6).required()
        })
        const res = await schema.validateAsync(data)
        return {error: false, data: res}
    } catch (error) {
        return {error: true, message: error.details[0].message}
    }
}

export const Auth = (req: any, res: any, next: any)=> {
    console.log('session', req.session)
    if (!req.session) {
        return res.send({error: 'not authorized'})
      }
      next()
}