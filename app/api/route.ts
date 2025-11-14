import { books } from "@/app/api/db"
import { NextResponse } from "next/server"

export async function GET(){
        return NextResponse.json(books)
}