import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

interface RedirectPageProps {
  params: { shortcode: string };
}
export default async function RedirectPage({ params }: RedirectPageProps) {
  const { shortcode } = await params;

  const url = await prisma.url.findUnique({
    where: { shortCode: shortcode },
  });

  if (!url) {
    return notFound();
  }

  await prisma.url.update({
    where: {
      id: url.id,
    },
    data: { visits: { increment: 1 } },
  });

  redirect(url.originalUrl);
}
