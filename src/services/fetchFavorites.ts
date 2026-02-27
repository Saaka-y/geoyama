export async function fetchFavorites(userId: string, mountainId: string) {
    try {
        const res = await fetch(
            `/api/favorites/toggle?userId=${userId}&mountainId=${mountainId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            },
        );

        const data = await res.json();

        if (!res.ok) {
            console.error("Failed to update favorite:", data);
            return { success: false, data };
        } else {
            console.log("Favorite updated successfully:", data); 
            return { success: true, data };
        }
    } catch (error) {
        console.error("Error updating favorite:", error);
        return { success: false, error };
    }
}
