"use client";
import { GoArrowDownRight } from "react-icons/go";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function DashboardButton() {
  const router = useRouter();
  return (
    <Button
      variant={"accent"}
      onClick={() => {
        router.push("/dashboard");
      }}
    >
      Dashboard
      <GoArrowDownRight className="-ml-1 h-full scale-110" />
    </Button>
  );
}

export default DashboardButton
