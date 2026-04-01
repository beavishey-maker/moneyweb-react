import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { checkAuth } from '../_auth'

const dataPath = join(process.cwd(), 'src/data/profile.json')

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = JSON.parse(readFileSync(dataPath, 'utf-8'))
  return NextResponse.json(data)
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  writeFileSync(dataPath, JSON.stringify(body, null, 2))
  return NextResponse.json(body)
}
