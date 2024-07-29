import { db } from "@/lib/db";

export const getGirls = async () => {
    try {
        const girls = await db.girl.findMany({
            select: {
                id: true,
                name: true
            }
        })

        return girls
    } catch (error) {
        console.log('@@@@', error)
        return [];
    }
}