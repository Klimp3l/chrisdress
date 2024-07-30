import { getClasses } from "@/data/class"

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
    const classes = await getClasses()

    return Response.json(classes)
}