export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto"


import Link from "next/link"
import PocketBase, { Record } from "pocketbase"


const getUsers = async(): Promise<Record[]> => {
  const client = new PocketBase(process.env.POCKETBASE_URL)
  await client.users.authViaEmail(process.env.POCKETBASE_USER!, process.env.POCKETBASE_PASSWORD!)
  const collections = await client.records.getFullList("users")
  return collections
}


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async function HomePage() {

  const users = await getUsers()

  return (
    <div>
      <h1 className="text-3xl" >Home page</h1>
      <div>
        {
          users.map((c, i) => {
            return <div key={i}>
              <Link href={`/${c.username}`}>
                {c.username} - bevuti: {c.coffees}
              </Link>
            </div>
          })
        }
      </div>
    </div>
  )
}
