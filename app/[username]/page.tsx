import { getUserCoffees } from "../../pages/api/[username]"
import AddCoffee from "./AddCoffee"

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
export default async function UserPage({ params }: any)  {

  const coffees = await getUserCoffees(params.username)

  return (
    <div>
      <h1 className="text-3xl" >User page</h1>
      <main className="container">
        <div>

          <div className="item text" >{params.username} si è bevutox</div>
          <div className="item counter" >{coffees}☕</div>
          <div className="item text" >Caffè dal primo gennaio {new Date().getFullYear()}</div>
          <AddCoffee username={params.username} />
        </div>
      </main>
    </div>
  )
}
