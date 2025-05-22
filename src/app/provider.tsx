"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/db/drizzle";
import { Users } from "@/db/schema";
import { eq } from "drizzle-orm";

function Provider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  useEffect(() => {
    user && isNewUser();
  }, [user]);
  const isNewUser = async () => {
    const result = await db
      .select()
      .from(Users)
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));
    if (!result[0]) {
      await db.insert(Users).values({
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        image: user?.imageUrl,
      });
    }
  };
  return <div>{children}</div>;
}

export default Provider;
