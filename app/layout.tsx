/* eslint-disable @next/next/no-head-element */
import React from "react"
import "../styles/globals.css"
import AuthProvider from "../context/Auth"
import Navbar from "./Navbar"

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}): React.ReactNode {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
