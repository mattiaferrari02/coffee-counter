import fs from "fs"
import path from "path"
const jwt = require("jsonwebtoken");
import NextCors from 'nextjs-cors';
import { addCoffe, getCoffees, validateAuth } from "../../lib/redis";

export default async (req, res) => {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });

        try {
                const { token } = req.query;
                jwt.verify(token, process.env.JWT_SECRET);
                await addCoffe()
                res.statusCode = 200
                res.json({ msg: 'lemme take a sip' })
                
        } catch (error) {
                res.statusCode = 404
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ msg: error }))
        }
        
}

async function coffeeTime() {

        console.log(Date.now())
    
}