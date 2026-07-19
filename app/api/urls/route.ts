import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const codesParam = request.nextUrl.searchParams.get("codes");
    const shortCodes = (codesParam ?? "")
      .split(",")
      .map((code) => code.trim())
      .filter(Boolean);

    if (shortCodes.length === 0) {
      return NextResponse.json([]);
    }

    const urls = await prisma.url.findMany({
      where: { shortCode: { in: shortCodes } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(urls);
  } catch (error) {
    console.log("Error fetching URLs", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
