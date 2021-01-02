import express from 'express'
import { Post } from '../enteties/Post'
import {ORM} from '../utils/index'

const router = express.Router()

router.get('/', async (_, res)=>{
    const orm = await ORM()
    const post = await orm.em.find(Post, {})
    return res.send(post)
})

router.get('/:id', async (req, res)=>{
    try {
        const orm = await ORM()
        const id = parseInt(req.params.id)
        const post = await orm.em.findOne(Post, {id})
        if (post){
            return res.send(post)   
        }
        return res.status(402).json({error: 'no post found'})
    } catch (error) {
        console.error(error)
        return res.status(402).json({error: error})
    }
})


router.post('/', async (req, res)=>{
    try {
        const orm = await ORM()
        const {title} = req.body
        const post = orm.em.create(Post, {title})
        await orm.em.persistAndFlush(post)
        return res.send(post)
    } catch (error) {
        console.error(error)
        return res.status(402).json({error: error})
    }
})

router.patch('/:id', async (req, res)=>{
    try {
        const orm = await ORM()
        const {title} = req.body
        const id = parseInt(req.params.id)
        const post = await orm.em.findOne(Post, {id})
        if(!post){
            return res.status(402).json({error: 'no post found'})
        }
        post.title = title
        await orm.em.persistAndFlush(post)
        return res.send(post)
    } catch (error) {
        console.error(error)
        return res.status(402).json({error: error})
    }
})

export default router