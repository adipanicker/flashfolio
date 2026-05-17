import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/dashboard/DashboardClient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const portfolio = await prisma.portfolio.findUnique({
    where: { userId: session.user.id },
  });

  if (!portfolio) {
    redirect("/onboarding");
  }

  return (
    <DashboardClient
      portfolio={JSON.parse(JSON.stringify(portfolio))}
      user={{
        name: session.user.name || "",
        email: session.user.email || "",
        image: session.user.image || "",
      }}
    />
  );
}
