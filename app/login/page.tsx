import LoginForm from "./LoginForm"


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async function HomePage() {

  return (
    <div>
      <h1 className="text-3xl" >LoginPage page</h1>

      <LoginForm />
    </div>
  )
}
