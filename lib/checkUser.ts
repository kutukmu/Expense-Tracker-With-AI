import { currentUser } from "@clerk/nextjs/server";

import { prismadb } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const loggedInUser = await prismadb.user.findUnique({
    where: {
      clerckUserId: user.id,
    },
  });

  if (loggedInUser) {
    return loggedInUser;
  }

  const newUser = await prismadb.user.create({
    data: {
      clerckUserId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0]?.emailAddress,
    },
  });

  return newUser;
};
