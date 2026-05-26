import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MinimalistTemplate from "@/components/templates/minimalist/index";
import TerminalTemplate from "@/components/templates/Terminal";
import ExecutiveTemplate from "@/components/templates/Executive";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const portfolio = await prisma.portfolio.findUnique({
    where: { username },
  });
  if (!portfolio) return { title: "Portfolio not found" };
  const data = portfolio.data as any;
  return {
    title: `${data.name} — Portfolio`,
    description: data.bio || `${data.name}'s portfolio built with FlashFolio`,
    openGraph: {
      title: `${data.name} — Portfolio`,
      description: data.bio,
      images: data.avatar ? [data.avatar] : [],
    },
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const portfolio = await prisma.portfolio.findUnique({
    where: { username },
  });

  if (!portfolio) notFound();

  await prisma.portfolio.update({
    where: { username },
    data: { viewCount: { increment: 1 } },
  });

  const data = portfolio.data as any;

  const templates: Record<string, any> = {
    minimalist: MinimalistTemplate,
    terminal: TerminalTemplate,
    executive: ExecutiveTemplate,
  };

  const Template = templates[portfolio.template] || MinimalistTemplate;

  return <Template data={data} username={username} />;
}
