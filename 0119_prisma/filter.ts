import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){

    const filteredPosts = await prisma.post.findMany({
        where:{
            OR:[{title:{contains:'hello'}},{content:{contains:'hello'}}]
        }
    })
    const post = await prisma.post.create({
        data: {
            title: 'Joun us for Day 2020',
            author: {
                connect: {email:'mihee@prisma.net'}
            }
        }
    })
    const posts = await prisma.profile.findUnique({
        where:{id:1}
    })
    .user()
    .posts()
    console.log(posts)

    const deletedUser = await prisma.user.delete({
        where:{email:'mihee@prisma.net'}
    })


}

main()
    .catch((e)=>{
        throw e
    })
    .finally(async ()=>{
        await prisma.$disconnect()
    })