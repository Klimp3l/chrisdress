import { db } from "@/lib/db";

export const dynamic = 'force-dynamic'

export async function getClasses() {
  try {
        const classes = await db.class.findMany({
            include: {
              colors: {
                select: {
                  id: true,
                  hex: true,
                }
              }
            }
          })

        return classes
    } catch (error) {
        console.log('@@@@', error)
        return [];
    }
}