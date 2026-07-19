import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const shortCode = nanoid(8);
    const shortenedUrl = await prisma.url.create({
      data: {
        originalUrl: url,
        shortCode,
      },
    });

    return NextResponse.json({
      id: shortenedUrl.id,
      shortCode: shortenedUrl.shortCode,
      originalUrl: shortenedUrl.originalUrl,
      visits: shortenedUrl.visits,
    });
  } catch (error) {
    console.log("Error shortening URL", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
