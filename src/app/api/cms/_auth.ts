import { NextRequest } from 'next/server'

export function checkAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')
  return token === process.env.CMS_SECRET_TOKEN
}
