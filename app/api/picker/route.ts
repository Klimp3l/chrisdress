import { getPickers, getPickersByColorId } from "@/data/picker"

export const dynamic = 'force-dynamic' // defaults to auto

interface Color {
    id: number;
    hex: string;
}

interface Girl {
    id: number;
    name: string;
}

interface Picker {
    id: number;
    girl: Girl;
    color: Color;
}

export async function GET(request: Request) {
    const url = new URL(request.url)
    const searchParams = url.searchParams

    const colorId = searchParams.get('colorId') // Substitua 'paramName' pelo nome do seu parâmetro

    let pickers: Picker[] | null = [];

    if (colorId) {
        pickers = await getPickersByColorId(parseInt(colorId))
    } else {
        pickers = await getPickers()
    }

    return Response.json(pickers)
}