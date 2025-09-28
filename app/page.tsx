import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import Guest from "@/components/Guest";

export default async function HomePage() {
  const user = await currentUser();

  if (!user) {
    return <Guest></Guest>;
  }
  return (
    <div className="bg-red-500">
      Hello World Again, This time I will be a real developer with my problem
      solving abilities
    </div>
  );
}
