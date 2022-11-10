import { NextApiRequest, NextApiResponse } from "next"
import PocketBase from "pocketbase"
import bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"


export const signUp = async(username: string, password: string): Promise<void> => {

  const client = new PocketBase(process.env.POCKETBASE_URL)
  await client.users.authViaEmail(process.env.POCKETBASE_USER!, process.env.POCKETBASE_PASSWORD!)

  await client.records.create("users", {
    username,
    password: await bcrypt.hash(password, 5),
    coffees: 0
  })
}


const route = async(req: NextApiRequest, res: NextApiResponse): Promise<void> => {

  if (req.method !== "POST") {
    res.status(405).send({ msg: "Only POST requests allowed" })
    return
  }

  try {
    const {
      username,
      password
    } = JSON.parse(req.body)

    await signUp(username, password)

    const token = jwt.sign({
      username
    }, process.env.JWT_SECRET!)

    res.status(200).json({
      token,
      user: {
        username
      }
    })
  } catch (error) {
    res.status(400).json({ error: JSON.stringify(error) })
  }

}


export default route
