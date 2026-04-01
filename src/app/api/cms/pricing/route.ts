import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { checkAuth } from '../_auth'

const dataPath = join(process.cwd(), 'src/data/pricing.json')

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = JSON.parse(readFileSync(dataPath, 'utf-8'))
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const data = JSON.parse(readFileSync(dataPath, 'utf-8'))
  const newItem = { ...body, id: `plan-${Date.now()}` }
  data.plans.push(newItem)
  writeFileSync(dataPath, JSON.stringify(data, null, 2))
  return NextResponse.json(newItem, { status: 201 })
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const data = JSON.parse(readFileSync(dataPath, 'utf-8'))
  data.plans = data.plans.map((p: any) => p.id === body.id ? body : p)
  writeFileSync(dataPath, JSON.stringify(data, null, 2))
  return NextResponse.json(body)
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  const data = JSON.parse(readFileSync(dataPath, 'utf-8'))
  data.plans = data.plans.filter((p: any) => p.id !== id)
  writeFileSync(dataPath, JSON.stringify(data, null, 2))
  return NextResponse.json({ success: true })
}
