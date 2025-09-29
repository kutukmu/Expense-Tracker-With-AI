"use server";

import { prismadb } from "@/lib/prisma";
import { Record } from "@/types/Record";
import { auth } from "@clerk/nextjs/server";

async function getRecords(): Promise<{
  records?: Record[];
  error?: string;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const records = await prismadb.record.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    return { records };
  } catch (error) {
    console.error("Error fetching records", error);
    return { error: "Database error" };
  }
}
