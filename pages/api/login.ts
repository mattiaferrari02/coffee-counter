import { NextApiRequest, NextApiResponse } from "next"
import PocketBase from "pocketbase"
import * as jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const login = async(username: string, password: string): Promise<string> => {

  const client = new PocketBase(process.env.POCKETBASE_URL)
  await client.users.authViaEmail(process.env.POCKETBASE_USER!, process.env.POCKETBASE_PASSWORD!)

  const records = await client.records.getFullList("users")
  const user = records.find(r => r.username === username.trim())
  if (!user) {
    throw new Error("Not found")
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({
      username
    }, process.env.JWT_SECRET!)
    return token
  } else {
    throw new Error("Wrong password")
  }

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

    const token = await login(username, password)

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
