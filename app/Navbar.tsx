"use client"

import Link from "next/link"
import React, { FC, useContext } from "react"
import { AuthContext } from "../context/Auth"

const Navbar: FC = () => {
  const { user, logout } = useContext(AuthContext)

  return (
    <div className="text-stone-200 bg-neutral-900 flex">
      <div className="p-4">
        <Link href="/">
          Coffee Counter
        </Link>
      </div>
      {
        !user ? [
          <div key="login" className="p-4">
            <Link href="/login">
              LOGIN
            </Link>
          </div>,
          <div key="signup" className="p-4">
            <Link href="/signUp">
              SIGNUP
            </Link>
          </div>
        ]
          :
          [
            <div key="profile" className="p-4">
              <Link href={`/${user.username}`} >
                {user.username}
              </Link>
            </div>,
            <div key="logout" className="p-4">
              <button onClick={logout} >
                LOGOUT
              </button>
            </div>
          ]
      }
    </div>
  )
}

export default Navbar
