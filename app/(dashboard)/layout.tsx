
import DashboardNavbar from "./DashboardNavbar"
const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <main>
        <DashboardNavbar/>
        {children}
    </main>
  )
}

export default layout