const jwt = require('jsonwebtoken');
import Cors from 'cors';
require("dotenv").config()
const bcrypt = require('bcryptjs');
import NextCors from 'nextjs-cors';
import { validateAuth } from '../../lib/redis';

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
        const { password } = req.body;
        if (await validateAuth(password)) {
            const token = jwt.sign({
                
            }, process.env.JWT_SECRET )
            res.json({ token: token });
        } else {
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ msg: error }))
        }
        
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ msg: "This isn't what you are looking for" }))
    }
};

