

export async function fetchMountainId(routeKey: string) {
    try {
        const res = await fetch(`/api/mountains/${routeKey}`);
        if (!res.ok) {
            const data = await res.json();
            console.error("Failed to fetch mountainId:", data);
            return null;
        }
        const data = await res.json();
        return data.id.toString();

    } catch (error: any) {
        console.error("Error fetching mountain:", error);
        throw new Error(error?.message || "Internal Server Error");
    }
}
