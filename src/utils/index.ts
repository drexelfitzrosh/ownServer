import { MikroORM } from "@mikro-orm/core"
import microOrmConfig from '../mikro-orm.config'

export const ORM = async ()=>{
    const orm = await MikroORM.init(microOrmConfig)
    return orm
}