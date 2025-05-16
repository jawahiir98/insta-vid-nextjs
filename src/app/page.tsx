import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="">
      <h2>Create your first short video today!</h2>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
