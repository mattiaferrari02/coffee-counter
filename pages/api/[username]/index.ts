import { NextApiRequest, NextApiResponse } from "next"
import PocketBase from "pocketbase"

export async function getUserCoffees(username: string): Promise<number> {
  const client = new PocketBase(process.env.POCKETBASE_URL)
  await client.users.authViaEmail(process.env.POCKETBASE_USER!, process.env.POCKETBASE_PASSWORD!)
  const records = await client.records.getFullList("users")
  const user = records.find(r => r.username === username)

  if (!user) {
    throw new Error("Not found")
  }

  return user.coffees as number
}


const route = async(req: NextApiRequest, res: NextApiResponse): Promise<void> => {

  if (req.method !== "GET") {
    res.status(405).send({ msg: "Only GET requests allowed" })
    return
  }

  try {
    const coffees = await getUserCoffees(req.query.username as string)
    res.statusCode = 200
    res.send(`Hai bevuto ${coffees} coffees`)
  } catch (error) {
    res.statusCode = 404
    res.send(error)
  }
}


export default route
