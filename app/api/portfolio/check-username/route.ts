import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const RESERVED = [
  "login",
  "register",
  "dashboard",
  "onboarding",
  "about",
  "api",
  "admin",
  "help",
  "home",
  "index",
  "settings",
  "portfolio",
  "null",
  "undefined",
  "username",
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username || username.length < 3) {
    return NextResponse.json({ available: false });
  }

  if (RESERVED.includes(username.toLowerCase())) {
    return NextResponse.json({ available: false });
  }

  const existing = await prisma.portfolio.findUnique({
    where: { username },
  });

  return NextResponse.json({ available: !existing });
}
