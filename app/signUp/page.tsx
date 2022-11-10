import SignUpForm from "./SignUpForm"


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async function HomePage() {

  return (
    <div>
      <h1 className="text-3xl" >SignUp page</h1>

      <SignUpForm />
    </div>
  )
}
