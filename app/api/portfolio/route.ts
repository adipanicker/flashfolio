import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { username, template, userType, data } = body;

    if (!username || !template || !userType) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const portfolio = await prisma.portfolio.upsert({
      where: { userId: session.user.id },
      update: { username, template, userType, data },
      create: { userId: session.user.id, username, template, userType, data },
    });

    return NextResponse.json(portfolio, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();

    const portfolio = await prisma.portfolio.update({
      where: { userId: session.user.id },
      data: body,
    });

    return NextResponse.json(portfolio);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await prisma.portfolio.delete({
      where: { userId: session.user.id },
    });

    return NextResponse.json({ message: "Portfolio deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
