
import Link from 'next/link'

const DashboardNavbar = () => {
  return (
    <nav>
        <ul className='w-full bg-white text-black flex gap-5'>
            <li>
                <Link href='/dashboard/user'>User</Link>
            </li>
            <li>
                <Link href='/dashboard/analytics'>Analytics</Link>
            </li>
        </ul>
    </nav>
  )
}

export default DashboardNavbar