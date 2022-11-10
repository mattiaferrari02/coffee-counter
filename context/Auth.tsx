"use client" // client component
import React, { createContext, FunctionComponent, ReactNode, useEffect, useState } from "react"

export type AuthContextType = {
  token?: string
  user?: User
  setUser: (user: User) => void
  setToken: (token: string) => void
  loading: boolean
  signUp: (username: string, password: string) => Promise<{ token: string, user: User }>
  logout: () => void
  login: (username: string, password: string) => Promise<{ token: string, user: User }>
}

type Props = {
  children: ReactNode
}

export type User = {
  username: string
}

export const AuthContext = createContext({} as AuthContextType)

const AuthProvider: FunctionComponent<Props> = ({ children }) => {

  const [token, setToken] = useState<string | undefined>(undefined)
  const [user, setUser] = useState<User | undefined>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!loading) {
      return
    }
    const localToken = localStorage.getItem("token")
    if (localToken) {
      setToken(localToken)
    }

    const localUser = localStorage.getItem("user")
    if (localUser) {
      setUser(JSON.parse(localUser))
    }

    setLoading(false)
  }, [])


  const signUp: AuthContextType["signUp"] = async(username, password) => {
    const res = await fetch("/api/signUp", {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      })
    })

    const data = await res.json() as { token: string, user: User }
    setToken(data.token)
    setUser(data.user)

    return data
  }

  const login: AuthContextType["login"] = async(username, password) => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      })
    })

    const data = await res.json() as { token: string, user: User }

    setToken(data.token)
    setUser(data.user)

    return data
  }

  const logout = (): void => {
    setToken(undefined)
    setUser(undefined)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

  useEffect(() => {
    if (!token || loading) {
      return
    }
    localStorage.setItem("token", token)
  }, [token])

  useEffect(() => {
    if (!user || loading) {
      return
    }
    localStorage.setItem("user", JSON.stringify(user))
  }, [user])

  return (
    <AuthContext.Provider value={{
      token,
      user,
      setToken,
      setUser,
      loading,
      signUp,
      logout,
      login
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
