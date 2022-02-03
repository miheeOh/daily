import { PrismaClient  } from "@prisma/client";

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