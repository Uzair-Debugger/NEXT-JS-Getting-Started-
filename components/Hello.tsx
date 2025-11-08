'use client';
import { useEffect } from 'react';

const Hello = () => {
  useEffect(() => {
    // Run only after the component mounts in the browser
    console.log('I am a client component');
  }, []);

  return <div>hello</div>;
};

export default Hello;