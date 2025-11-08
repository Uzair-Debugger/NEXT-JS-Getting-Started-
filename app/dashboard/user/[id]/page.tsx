import React from 'react'

const DynamicRoutes = async ({params}: {params: Promise<{id: string}>}) => {
    const {id} = await params
  return (
    <div>You are in User{id} route</div>
  )
}

export default DynamicRoutes