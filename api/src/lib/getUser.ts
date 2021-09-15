import { prisma } from "lib/prisma";

export async function getUser(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      accounts: true,
    },
  });
}
