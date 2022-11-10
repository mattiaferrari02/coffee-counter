import Link from "next/link"
import PocketBase from "pocketbase"

const client = new PocketBase(process.env.POCKETBASE_URL)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async function HomePage() {

  await client.users.authViaEmail(process.env.POCKETBASE_USER!, process.env.POCKETBASE_PASSWORD!)
  const collections = await client.records.getFullList("users")

  return (
    <div>
      <h1 className="text-3xl" >Home page</h1>
      <div>
        {
          collections.map((c, i) => {
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
