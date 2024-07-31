import { getPickers, upSertPicker } from "@/data/picker"

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
    girl: Girl;
    color: Color;
}

export async function GET(request: Request) {
    let pickers: Picker[] | [] = await getPickers()

    return Response.json(pickers)
}

export async function POST(request: Request) {
    const data = await request.json()

    const response = await upSertPicker(data)

    return Response.json(response)
}