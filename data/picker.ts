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

interface Toast {
    title: string;
    description: string;
    variant: "default" | "destructive" | null | undefined;
}

export const upSertPicker = async (data: upSertPicker) => {
    try {
        let response:Toast

        const picker = await db.pickers.findMany({
            where: {
                colorId: data.colorId
            }
        })

        if (picker.length == 2) {
            response = { title: "😥 Esta cor já foi escolhida por outras duas Madrinhas!", description: "Por favor escolha outra cor.", variant: "default" }
            return response
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
            
            response = { title: "😁 Uhuuul, esta cor agora é sua cor do vestido!", description: "Se arrependeu? só ir e escolher outra 😉.", variant: "default" }
            return response
        }
    } catch (error) {
        console.log('@@@@', error)
        const response:Toast ={ title: "Erro", description: "AVISA O BEEER!", variant: "destructive" }
        return response;
    }
}