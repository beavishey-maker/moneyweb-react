export function getToken(): string {
  return sessionStorage.getItem('cms_token') ?? ''
}

export async function cmsGet(resource: string) {
  const res = await fetch(`/api/cms/${resource}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  if (!res.ok) throw new Error(`GET ${resource} failed: ${res.status}`)
  return res.json()
}

export async function cmsPost(resource: string, body: unknown) {
  const res = await fetch(`/api/cms/${resource}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`POST ${resource} failed: ${res.status}`)
  return res.json()
}

export async function cmsPut(resource: string, body: unknown) {
  const res = await fetch(`/api/cms/${resource}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`PUT ${resource} failed: ${res.status}`)
  return res.json()
}

export async function cmsDelete(resource: string, id: string) {
  const res = await fetch(`/api/cms/${resource}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify({ id }),
  })
  if (!res.ok) throw new Error(`DELETE ${resource} failed: ${res.status}`)
  return res.json()
}
