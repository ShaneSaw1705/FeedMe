'use server'
import { getSession } from "@auth0/nextjs-auth0";
import { PrismaClient, Feed } from "@prisma/client"
const db = new PrismaClient()

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function createFeed(formData: FormData): Promise<[string | null, Feed | null]> {
  const session = await getSession()
  if (!session?.user.sub) {
    const err = 'bullshit'
    return [err, null]
  }
  const title = formData.get('title')
  if (!title) {
    const err = 'unable to receive the title'
    console.error(err)
    return [err, null]
  }

  try {
    const res = await db.feed.create({
      data: {
        title: title.toString(),
        secret: 'test-secret',
        author_sub: `${session.user.sub}`
      }
    })
    await sleep(2000)
    return [null, res]
  } catch (err) {
    console.error(err)
    return [`${err}`, null]
  }
}

