import React from "react";
import { UserButton } from "@clerk/nextjs";
function Dasboard() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

export default Dasboard;
