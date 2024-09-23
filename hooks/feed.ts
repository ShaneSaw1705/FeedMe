'use server'
import { getSession } from "@auth0/nextjs-auth0";
import { PrismaClient, Feed } from "@prisma/client"

const db = new PrismaClient()

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
    return [null, res]
  } catch (err) {
    console.error(err)
    return [`${err}`, null]
  }
}


export async function deprecatedFetchUserFeeds(): Promise<[string | null, Feed[] | null]> {
  const session = await getSession();
  if (!session?.user.sub) {
    const err = 'could not get a current signed in user';
    return [err, null];
  }
  try {
    const res: Feed[] = await db.feed.findMany({
      where: {
        author_sub: session.user.sub
      }
    })
    return [null, res]
  } catch (err) {
    return [`${err}`, null]
  }
}

export async function fetchUserFeeds(): Promise<Feed[]> {
  const prisma = new PrismaClient();
  const session = await getSession()
  const userId = session?.user.sub
  if (!userId) {
    console.error('failed to retreive user id')
    throw new Error('User not authenticated')
  }
  try {
    const res: Feed[] = await prisma.feed.findMany({
      where: {
        author_sub: userId
      }
    })
    // Serialize Prisma data
    return res.map((feed) => JSON.parse(JSON.stringify(feed)));
  } catch (err) {
    console.error(err)
    throw new Error(`${err}`)
  } finally {
    await prisma.$disconnect();
  }
}
