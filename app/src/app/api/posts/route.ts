import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { PostTypes } from '../../types';
import _get from 'lodash/get';

const prisma = new PrismaClient();

export async function GET(request: NextRequest): Promise<NextResponse<PostTypes[]>> {
  // GET /api/posts リクエストの処理
  const data = await prisma.post.findMany();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest): Promise<NextResponse<PostTypes | null>> {
  // POST /api/posts リクエストの処理
  
  /**
   * { body: { data: { title: 'title', content: 'content' } } }
   */
  const body = await request.json();
  const result = await prisma.post.create({
    data: {
      title: _get(body, 'data.title', ''),
      content: _get(body, 'data.content', '')
    }
  });
  return NextResponse.json(result);
}
