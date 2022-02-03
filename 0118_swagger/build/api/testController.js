"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyTest = exports.userDelete = exports.userUpdate = exports.userFind = exports.userCreate = void 0;
const prisma_1 = require("../prisma");
// create
async function userCreate(req, res, next) {
    try {
        const { username, contact } = req.body;
        const result = await prisma_1.prisma.user.create({
            data: {
                username: username,
                contact: contact
            }
        });
        res.json(result);
    }
    catch (e) {
        console.error(e);
    }
}
exports.userCreate = userCreate;
// read
async function userFind(req, res, next) {
    try {
        console.log(req.params, 'reqparamssssss');
        const { id } = req.params;
        const idx = parseInt(id);
        const result = await prisma_1.prisma.user.findUnique({
            where: {
                Id: idx
            }
        });
        res.json(result);
    }
    catch (e) {
        console.error(e);
    }
}
exports.userFind = userFind;
// update
async function userUpdate(req, res, next) {
    try {
        console.log(req.params, 'paramssss');
        console.log(req.body, 'bodyyyyy');
        const { username, contact } = req.body;
        const { id } = req.params;
        const idx = parseInt(id);
        const result = await prisma_1.prisma.user.update({
            where: { Id: idx },
            data: {
                username: username,
                contact: contact
            }
        });
    }
    catch (e) {
        console.error(e);
    }
}
exports.userUpdate = userUpdate;
// delete
async function userDelete(req, res, next) {
    try {
        console.log(req.params, 'pardefelelelelelel');
        const { id } = req.params;
        const idx = parseInt(id);
        const result = await prisma_1.prisma.user.delete({
            where: {
                Id: idx
            }
        });
    }
    catch (e) {
        console.error(e);
    }
}
exports.userDelete = userDelete;
async function bodyTest(req, res, next) {
    try {
        console.log(req.body);
    }
    catch (e) {
        console.error(e);
    }
}
exports.bodyTest = bodyTest;
// module.exports = {
//     userCreate,
//     userFind,
//     userUpdate,
//     userDelete
// }
