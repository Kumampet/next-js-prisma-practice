import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { PostTypes } from '../../types';

const prisma = new PrismaClient();

export async function GET(request: NextRequest): Promise<NextResponse<PostTypes[]>> {
  // GET /api/posts リクエストの処理
  const data = await prisma.post.findMany();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  // POST /api/posts リクエストの処理
  
  // await prisma.post.create({
  //   data: {
  //     title: "aaa",
  //     content: "aaaa"
  //   }
  // });
}