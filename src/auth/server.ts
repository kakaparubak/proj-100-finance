import { prisma } from '@/db/prisma'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  const client = createServerClient(
    process.env.NEXT_SUPABASE_URL!,
    process.env.NEXT_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )

  return client;
}

export async function getUser() {
  const client = await createClient();
  const userObject = await client.auth.getUser();

  if (userObject.error) {
    console.error("Error fetching user");
    return null;
  }

  return userObject.data.user;
}

export async function getUserInDB() {
  const client = await createClient();
  const userObject = await client.auth.getUser();

  if (userObject.error) {
    console.error("Error fetching user");
    return null;
  }

  const user = prisma.user.findUnique({
    where: {
      id: userObject.data.user.id
    }
  })

  return user;
}