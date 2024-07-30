import { getGirls } from "@/data/girl"

export async function GET(request: Request) {
    const girls = await getGirls()

    return Response.json(girls)
}