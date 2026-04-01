import { NextRequest, NextResponse } from 'next/server'
import { checkAuth } from '../_auth'
import { cmsRead, cmsWrite } from '../_github'

const FILE = 'src/data/seminars.json'

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await cmsRead(FILE)
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const data = await cmsRead(FILE) as any
  const newItem = { ...body, id: `seminar-${Date.now()}` }
  data.seminars.push(newItem)
  await cmsWrite(FILE, data)
  return NextResponse.json(newItem, { status: 201 })
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const data = await cmsRead(FILE) as any
  data.seminars = data.seminars.map((s: any) => s.id === body.id ? body : s)
  await cmsWrite(FILE, data)
  return NextResponse.json(body)
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  const data = await cmsRead(FILE) as any
  data.seminars = data.seminars.filter((s: any) => s.id !== id)
  await cmsWrite(FILE, data)
  return NextResponse.json({ success: true })
}
