'use server'
import { db } from "@/lib/db";
import { title } from "process";

interface Color {
    id: number;
    hex: string;
}

interface Girl {
    id: number;
    name: string;
}

export const getPickers = async () => {
    try {
        const pickers = await db.pickers.findMany({
            select: {
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

interface upSertPicker {
    girlId: number;
    colorId: number;
}

export const upSertPicker = async (data: upSertPicker) => {
    try {
        const picker = await db.pickers.findMany({
            where: {
                colorId: data.colorId
            }
        })

        if (picker.length == 2) {
            return { title: "😥 Esta cor já foi escolhida por outras duas Madrinhas!", description: "Por favor escolha outra cor.", variant: "default" }
        } else {
            await db.pickers.upsert({
                where: {
                    girlId: data.girlId
                },
                create: {
                    girlId: data.girlId,
                    colorId: data.colorId
                },
                update: {
                    girlId: data.girlId,
                    colorId: data.colorId
                }     
            })
            
            return { title: "😁 Uhuuul, esta cor agora é sua cor do vestido!", description: "Se arrependeu? só ir e escolher outra 😉.", variant: "default" }
        }
    } catch (error) {
        console.log('@@@@', error)
        return { title: "Erro", description: error, variant: "destructive" };
    }
}