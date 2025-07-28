import DashboardHeader from "./header-comp/DashboardHeader";
import HomeHeader from "./header-comp/HomeHeader";
import { headers } from "next/headers";

async function Header() {
  const headersList = await headers();
  const pathname = headersList.get("x-current-path");
  const isDashboard = (pathname === "/dashboard");
  return (
    isDashboard ? <DashboardHeader /> : <HomeHeader />
  );
}

export default Header;
