import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const REPO = 'beavishey-maker/moneyweb-react'

function localPath(filePath: string) {
  return join(process.cwd(), filePath)
}

export async function cmsRead(filePath: string): Promise<unknown> {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    return JSON.parse(readFileSync(localPath(filePath), 'utf-8'))
  }
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${filePath}`,
    {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' },
      cache: 'no-store',
    }
  )
  if (!res.ok) throw new Error(`GitHub read failed: ${res.status}`)
  const data = await res.json()
  return JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'))
}

export async function cmsWrite(filePath: string, data: unknown): Promise<void> {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    writeFileSync(localPath(filePath), JSON.stringify(data, null, 2))
    return
  }
  // Get current SHA
  const getRes = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${filePath}`,
    {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' },
      cache: 'no-store',
    }
  )
  if (!getRes.ok) throw new Error(`GitHub get SHA failed: ${getRes.status}`)
  const fileData = await getRes.json()

  const putRes = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${filePath}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `cms: update ${filePath.split('/').pop()}`,
        content: Buffer.from(JSON.stringify(data, null, 2)).toString('base64'),
        sha: fileData.sha,
      }),
    }
  )
  if (!putRes.ok) {
    const err = await putRes.json()
    throw new Error(`GitHub write failed: ${JSON.stringify(err)}`)
  }
}
