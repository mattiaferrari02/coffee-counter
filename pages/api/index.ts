import { NextApiRequest, NextApiResponse } from "next"
import { getCoffees } from "../../lib/redis"


const route = async(req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { coffees } = await getCoffees()

  res.statusCode = 200
  res.send(`Hai bevuto ${coffees} caffè`)
}

export const getData = async(): Promise<{ coffees: string }> => {
  return getCoffees()
}

export default route
