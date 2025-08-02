"use client";
import { usePathname } from "next/navigation";
import DashboardHeader from "./header-comp/DashboardHeader";
import HomeHeader from "./header-comp/HomeHeader";
import { useEffect, useState } from "react";

function Header() {
  const pathname = usePathname();
  const [isDashboard, setIsDashboard] = useState(false);

  useEffect(() => {
    if (pathname === "/dashboard") {
      setIsDashboard(true);
    } else {
      setIsDashboard(false);
    }
  }, [pathname]);

  return (
    isDashboard ? <DashboardHeader /> : <HomeHeader />
  );
}

export default Header;