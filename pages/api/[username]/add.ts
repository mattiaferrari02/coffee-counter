import { NextApiRequest, NextApiResponse } from "next"
import PocketBase from "pocketbase"
import * as jwt from "jsonwebtoken"


export async function addCoffeToUser(username: string): Promise<void> {
  const client = new PocketBase(process.env.POCKETBASE_URL)
  await client.users.authViaEmail(process.env.POCKETBASE_USER!, process.env.POCKETBASE_PASSWORD!)
  const records = await client.records.getFullList("users")

  const user = records.find(r => r.username === username)

  if (!user) {
    throw new Error("Not found")
  }

  await client.records.create("coffeeHistory", {
    user: user.id
  })

  await client.records.update("users", user.id, {
    coffees: user.coffees + 1
  })

}


const route = async(req: NextApiRequest, res: NextApiResponse): Promise<void> => {

  if (req.method !== "GET") {
    res.status(405).send({ msg: "Only GET requests allowed" })
    return
  }

  try {
    const { token } = req.query
    jwt.verify(token as string, process.env.JWT_SECRET!)
    const decoded = jwt.decode(token as string)
    await addCoffeToUser((decoded as jwt.JwtPayload).username)

    res.statusCode = 200
    res.json({ msg: "OK" })
  } catch (error) {
    res.statusCode = 404
    res.send(error)
  }
}


export default route
