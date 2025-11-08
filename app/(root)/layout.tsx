import React, { ReactNode } from "react"


const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <main>
        <p>Navbar</p>
        {children}
    </main>
  )
}

export default layout