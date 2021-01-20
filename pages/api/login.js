const jwt = require('jsonwebtoken');
const path = require('path')
require("dotenv").config({path: path.resolve(__dirname, '../../.env.development.local')})
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

export default async (req, res) => {
    if (req.method === 'POST') {
        const {username, password} = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email: username
            }
        })
        
        try {
            if (await bcrypt.compare(password, user.password)){
                const {id, email, name, surname} = user;
                const token = jwt.sign({
                    id, email, name, surname
                }, process.env.JWT_SECRET )
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ token: token }))

            }else throw "sdfasfg";
        } catch (error) {
            console.log("pipo");
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ msg: "This isn't what you are looking for" }))
        }

        
    } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ msg: "This isn't what you are looking for" }))
    }
}