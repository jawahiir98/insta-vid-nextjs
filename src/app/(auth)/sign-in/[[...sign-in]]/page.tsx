import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div style={{ position: "relative", height: "100vh", width: "70%" }}>
          <Image
            src="/login.webp"
            alt="Login"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex justify-center items-center h-screen">
          <SignIn />
        </div>
      </div>
    </>
  );
}
