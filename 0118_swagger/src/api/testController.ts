import * as express from 'express';
import { parse } from 'path/posix';
import {prisma} from '../prisma'

// create
export async function userCreate (req:express.Request,res:express.Response,next:express.NextFunction){
    try{
        const {username,contact} = req.body
        const result = await prisma.user.create({
            data:{
                username:username,
                contact:contact
            }
        })
        res.json(result)
    }catch(e){
        console.error(e)
    }
}

// read
export async function userFind (req:express.Request,res:express.Response, next:express.NextFunction){
    try{
        console.log(req.params,'reqparamssssss')
        const {id} = req.params
        const idx = parseInt(id)
        const result = await prisma.user.findUnique({
            where:{
                Id:idx
            }
        })
        res.json(result)
    }catch(e){
        console.error(e)
    }
}

// update
export async function userUpdate (req:express.Request,res:express.Response,next:express.NextFunction){
    try{      
        const {username, contact} = req.body
        const {id} = req.params
        const idx = parseInt(id);
        const result = await prisma.user.update({
            where:{Id:idx},
            data:{
                username:username,
                contact:contact
            }
        })
    }catch(e){
        console.error(e)
    }
}

// delete
export async function userDelete (req:express.Request,res:express.Response,next:express.NextFunction){
    try{
        const {id} = req.params
        const idx = parseInt(id)
        const result = await prisma.user.delete({
            where:{
                Id:idx
            }
        })
    }catch(e){
        console.error(e)
    }
}

export async function bodyTest (req:express.Request, res:express.Response,next:express.NextFunction){
    try{
        console.log(req.body)
    }catch(e){
        console.error(e)
    }
}
