"use strict";
exports.__esModule = true;
exports.prisma = void 0;
var client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient({
    log: [{
            emit: 'event',
            level: 'query'
        }]
});
exports.prisma.$on('query', function (e) {
    e.timestamp;
    e.query;
    e.params;
    e.duration;
    e.target;
    console.log(e);
});
//# sourceMappingURL=prisma.js.map