const { PrismaClient } = require('@prisma/client')
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

export default async (req, res) => {
        const {token} = req.query;
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            //const decoded = jwt.decode(token, process.env.JWT_SECRET);
            //console.log(jwt.decode(token));
            coffeeTime().catch((e) => {
                console.log(e);
            }).finally(async () => {
                await prisma.$disconnect()
                res.statusCode = 200
                res.json({ msg: 'lemme take a sip' })
            })
        } catch (error) {
            res.statusCode = 200
            res.json({ msg: 'Not today' })
        }
}

async function coffeeTime() {

        console.log(Date.now())
        await prisma.coffee.create({
            data: {
                time: new Date(Date.now()).toISOString(),
                userId: 1
            }
        })
    
}