import { NextRequest, NextResponse } from 'next/server'
import { checkAuth } from '../_auth'
import { cmsRead, cmsWrite } from '../_github'

const FILE = 'src/data/site.json'

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await cmsRead(FILE)
  return NextResponse.json(data)
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  await cmsWrite(FILE, body)
  return NextResponse.json(body)
}
