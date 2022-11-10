"use client"

import { useRouter } from "next/navigation"
import React, { FunctionComponent, useContext } from "react"
import { useForm } from "react-hook-form"
import { AuthContext } from "../../context/Auth"

const SignUpForm: FunctionComponent = () => {
  const router = useRouter()
  const { signUp } = useContext(AuthContext)
  const { register, handleSubmit } = useForm()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async(data: any): Promise<void> => {
    await signUp(data.username, data.password)
    router.replace(`/${data.username}`)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="border-solid border-2 border-black"
          placeholder="username" {...register("username", { required: true })}
        />
        <input
          className="border-solid border-2 border-black"
          placeholder="password" type="password" {...register("password", { required: true })}
        />
        <input type="submit" />
      </form>
    </div>
  )
}

export default SignUpForm
