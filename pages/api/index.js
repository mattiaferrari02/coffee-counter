import NextCors from 'nextjs-cors';
import { getCoffees } from '../../lib/redis';

export default async (req, res) => {
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    const { coffees } = await getCoffees()
    
    res.statusCode = 200
    res.send(`Hai bevuto ${coffees} caffè`)
}

export const getData = async () =>{
    return await getCoffees()
}