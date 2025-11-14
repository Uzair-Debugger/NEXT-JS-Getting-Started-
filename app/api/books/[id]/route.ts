import { books } from "@/app/api/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  const book = books.find((b) => b.id === id);
  if (!book)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(book);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  const updated = await request.json();

  const index = books.findIndex((b) => b.id === id);
  if (index === -1)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  books[index] = updated;

  return NextResponse.json(books);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  const index = books.findIndex((b) => b.id === id);
  if (index === -1)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  books.splice(index, 1);

  return NextResponse.json(books);
}
