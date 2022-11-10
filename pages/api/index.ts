import { NextApiRequest, NextApiResponse } from "next"


const route = async(req: NextApiRequest, res: NextApiResponse): Promise<void> => {

  res.statusCode = 200
  res.json({ msg: "OK" })
}


export default route
