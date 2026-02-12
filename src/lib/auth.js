import { auth, clerkClient } from "@clerk/nextjs/server";

export async function requireUserId() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("UNAUTHENTICATED");
  }
  return userId;
}

export async function requireAdmin() {
  const { userId } = await auth();
  if (!userId) throw new Error("UNAUTHENTICATED");

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const role = user.publicMetadata?.role;
  if (role !== "admin") throw new Error("FORBIDDEN");

  return userId;
}
