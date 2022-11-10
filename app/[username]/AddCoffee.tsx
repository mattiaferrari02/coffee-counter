"use client"

import { useRouter } from "next/navigation"
import React, { FunctionComponent, useContext } from "react"
import { AuthContext } from "../../context/Auth"

export type Props = {
  username: string
}

const AddCoffee: FunctionComponent<Props> = ({ username }) => {
  const router = useRouter()
  const { user, token } = useContext(AuthContext)
  const handleClick = async(): Promise<void> => {
    await fetch(`/api/${username}/add?token=${token!}`)
    router.refresh()
  }


  if (!user || user.username !== username) {
    return null
  }

  return (
    <div>
      <button onClick={handleClick}>
        Add Coffe
      </button>
    </div>
  )
}

export default AddCoffee
