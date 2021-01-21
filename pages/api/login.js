const jwt = require('jsonwebtoken');
import Cors from 'cors';
require("dotenv").config()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
import NextCors from 'nextjs-cors';

import headers from "./next.config"

function initMiddleware(middleware) {
    return (req, res) =>
        new Promise((resolve, reject) => {
            middleware(req, res, (result) => {
                if (result instanceof Error) {
                    return reject(result)
                }
                return resolve(result)
            })
        })
}


const cors = initMiddleware(Cors({
    methods: ['POST'],
}))



export default async (req, res) => {

    await NextCors(req, res, {
        // Options
        methods: ['POST'],
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });


    if (req.method === 'POST') {
        const {username, password} = req.body;
        console.log(req.body);

        const user = await prisma.user.findUnique({
            where: {
                email: username
            }
        })
        console.log(user);
        try {
            if (await bcrypt.compare(password, user.password)){
                const {id, email, name, surname} = user;
                const token = jwt.sign({
                    id, email, name, surname
                }, process.env.JWT_SECRET )
                console.log("sending data", token);
                res.json({ token: token });

            }else throw "sdfasfg";
        } catch (error) {
            console.log("pipo");
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ msg: error }))
        }

        
    } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ msg: "This isn't what you are looking for" }))
    }
};

