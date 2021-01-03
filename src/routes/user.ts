import express from 'express'
import { User } from '../enteties/User'
import {loginValidation, ORM, registerValidation} from '../utils/index'
import argon2 from 'argon2'

const router = express.Router()

// router.get('/', async (_, res)=>{
//     const orm = await ORM()
//     const post = await orm.em.find(Post, {})
//     return res.send(post)
// })

// router.get('/:id', async (req, res)=>{
//     try {
//         const orm = await ORM()
//         const id = parseInt(req.params.id)
//         const post = await orm.em.findOne(Post, {id})
//         if (post){
//             return res.send(post)   
//         }
//         return res.status(402).json({error: 'no post found'})
//     } catch (error) {
//         console.error(error)
//         return res.status(402).json({error: error})
//     }
// })


router.post('/register', async (req, res)=>{
    try {
        const orm = await ORM()
        const body = req.body
        const validation = await registerValidation(body)
        if(validation.error){
            return res.status(400).send({errorMsg: validation.message})
        }
        const {name, email, password} = validation.data
        const hashPassword = await argon2.hash(password)
        const user = orm.em.create(User, {name, email, password: hashPassword})
        await orm.em.persistAndFlush(user)
        return res.send({...user, password: null})
    } catch (error) {
        console.error(error)
        if (error.code === '23505'){
            return res.status(402).json({error: 'email already exist'})
        }
        return res.status(402).json({error: error})
    }
})

router.post('/login', async (req, res)=>{
    try {
        const orm = await ORM()
        const body = req.body
        const validation = await loginValidation(body)
        if(validation.error){
            return res.status(400).send({errorMsg: validation.message})
        }
        const {email, password} = validation.data
        const user = await orm.em.findOne(User, {email})
        if (!user){
            return res.status(400).send({errorMsg: 'email or password is not valid'})
        }
        const valid = await argon2.verify(user.password, password)
        if (!valid){
            return res.status(400).send({errorMsg: 'email or password is not valid'})
        }
        return res.send({...user, password: null})
    } catch (error) {
        console.error(error)
        return res.status(402).json({error: error})
    }
})


export default router