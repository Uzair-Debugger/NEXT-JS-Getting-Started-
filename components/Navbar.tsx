'use client';
import Link from "next/link";

const Navbar = () => {
  return (
    <nav aria-label="Navbar-main">
        <ul className="gap-x-10 p-2 m-3 flex bg-white text-black">
            <li><Link href='/shop'>Shop</Link></li>
            <li><Link href='/about'>About</Link></li>
            <li><Link href='/dashboard/user'>User</Link></li>
            <li><Link href='/dashboard/analytics'>Analytics</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar