import { db } from "@/lib/db";

export const getClasses = async () => {
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