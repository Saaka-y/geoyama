import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

export function FavoriteBtn() {
    const { data: session } = useSession();
    const router = useRouter();
    const [isFavorite, setIsFavorite] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleFavorite = () => {
        if (!session) {
            router.push("/signin");
            return;
        }

        setIsFavorite((prev) => !prev);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);
    };

    return (
        <button
            className="favorite-btn"
            aria-label="お気に入り登録"
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
