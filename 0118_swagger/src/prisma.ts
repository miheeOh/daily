import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient({
    log: [{
        emit: 'event',
        level: 'query'
    }]
});

prisma.$on('query', e => {
    e.timestamp;
    e.query;
    e.params;
    e.duration;
    e.target;
    console.log(e)
})



// 아래의 주석 부분에 대한 이해 부족... 이 부분은 나중에 이해하면 추가해보겠습니다...
/*
export const prisma = new Prismaclient({
    log:[{
        emit:'event',
        level:'query'
    }]
})
// 값 받을때 어떤 내용을 받을 지에 관한 내용...
    prisma.$on('query',e=>{
        e.timestamp;
        e.query;
        e.params;
        e.duration;
        e.target;
        console.log(e)
    })
*/