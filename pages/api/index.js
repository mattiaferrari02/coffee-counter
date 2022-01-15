import NextCors from 'nextjs-cors';
import { getCoffees } from '../../lib/redis';

export default async (req, res) => {
    let data = "N/A";
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    data = await getCoffees()
    
    res.statusCode = 200
    res.send(data)
}

export const getData = async () =>{
    return await getCoffees()
}