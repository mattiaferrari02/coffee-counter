const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
import NextCors from 'nextjs-cors';

export default async (req, res) => {
    let data = "N/A";
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    data = await prisma.coffee.count()

    res.statusCode = 200
    res.send(data)
}

export const getData = async () =>{
    return await prisma.coffee.count()
}