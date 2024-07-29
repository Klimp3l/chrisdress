import { db } from "@/lib/db";

export const getPickers = async () => {
    try {
        const pickers = await db.pickers.findMany({
            select: {
                id: true,
                girl: true,
                color: {
                    select: {
                        id: true,
                        hex: true
                    }
                }
            }
        })

        return pickers
    } catch (error) {
        console.log('@@@@', error)
        return [];
    }
}

export const getPickersByColorId = async (colorId: number) => {
    try {
        const pickers = await db.pickers.findMany({
            where: {
                colorId: colorId
            },
            select: {
                id: true,
                girl: true,
                color: {
                    select: {
                        id: true,
                        hex: true
                    }
                }
            }
        })

        return pickers
    } catch (error) {
        console.log('@@@@', error)
        return [];
    }
}