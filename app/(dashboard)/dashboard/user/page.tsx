import Link from "next/link"

const user = () => {
    return (
        <main>

            <Link href="/dashboard/user/1"><li>User1</li></Link>
            <Link href="/dashboard/user/2"><li>User2</li></Link>
            <Link href="/dashboard/user/3"><li>User3</li></Link>
            <Link href="/dashboard/user/4"><li>User4</li></Link>
        </main>

    )
}

export default user