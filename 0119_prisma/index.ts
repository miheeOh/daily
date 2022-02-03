import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
/*
async function main(){
    await prisma.user.create({
        data:{
            name: 'mihee1',
            email:'mihee@prisma.net1',
            posts: {
                create: {title:'hello world1'}
            },
            profile: {
                create: {bio: 'i like turtles'}
            }
        }
    })
    const allUsers = await prisma.user.findMany({
        include: {
            posts: true,
            profile: true
        }
    });
    console.dir(allUsers,{depth: null})
}
*/

async function main() {
    const post = await prisma.post.update({
        where:{id:1},
        data:{published:true}
    })
    console.log(post)
}

main()
    .catch((e)=>{
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })