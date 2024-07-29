import { getGirls } from "@/data/girl"

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
    const girls = await getGirls()

    return Response.json(girls)
}