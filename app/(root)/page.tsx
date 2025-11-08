// import React from 'react'
/*
In modern Next.js (and recent versions of React), automatic JSX runtime is enabled. This means:

import React from 'react';

is optional. The compiler automatically handles JSX transformation, so including it can sometimes interfere with Next.js’ internal optimizations, especially in SSR.
*/

import Hello from "../../components/Hello"
const Home = () => {
  // we talked that NEXT by default creates server components so at this case the console.log should not appear in my browser console tab, but it appears why? because the new version of NEXT just sharing this for convenience
  // console.log('What type of a component am I?')

  return (
    <main>

    <div className="text-5xl underline">Welcome to Next.Js Tutorial</div>
    <Hello /> 
    {/* This <Hello/> component will run in terminal as well altough it's a client component but because it's renderend in the server component as well so server will run it too after it's "hydration". */}
    </main>
  )
}

export default Home