import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchFavorites } from "@/services/fetchFavorites";

type Props = {
    mountainId: string | null;
};

export function FavoriteBtn({ mountainId }: Props) {
    const { data: session } = useSession();
    const router = useRouter();
    const [isFavorite, setIsFavorite] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // Check if the mountain is  favorited 
    useEffect(() => {
        if(session && mountainId) {
            fetch(`/api/favorites/check?userId=${session.user.id}&mountainId=${mountainId}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setIsFavorite(data.isFavorite);
                    }
                });
        }
    }, [session, mountainId, isFavorite]);

    const handleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!session) {
            router.push("/signin");
            return;
        }

        setIsFavorite((prev) => !prev);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);

        const { id: userId } = session.user;

        const res = await fetchFavorites(userId!, mountainId!);

        if (!res.success) {
            setIsFavorite((prev) => !prev);
            alert("Failed to update favorite. Please try again.");
        }
    };

    return (
        <button
            className="favorite-btn"
            aria-label="Toggle favorite"
            onClick={handleFavorite}
        >
            {isFavorite ? (
                <FaBookmark size={26} className="favorite-filled" />
            ) : (
                <CiBookmark size={26} />
            )}
        </button>
    );
}
