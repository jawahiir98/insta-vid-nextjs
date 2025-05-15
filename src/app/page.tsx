import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="">
      <h2>Create your first short video today!</h2>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
