const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

export default async (req, res) => {
    let data = "N/A";
    data = await prisma.coffee.count()

    res.statusCode = 200
    res.json({ data: data })
}

export const getData = async () =>{
    return await prisma.coffee.count()
}