import { useState } from "react";
import { useUserStore } from "@/stores/userStore";
import { LiaToggleOffSolid, LiaToggleOnSolid } from "react-icons/lia";

export function FavoriteToggle() {
    const { favorite, setFavorite } = useUserStore();
    const [showFavoite, setShowFavorite] = useState<boolean>(false);

    const isOn = showFavoite;

    const TEXT_WIDTH = 90; // px
    const BUTTON_WIDTH = 200; // px

    return (
        <button
            onClick={() => setShowFavorite(!showFavoite)}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                alignContent: "center",
                width: BUTTON_WIDTH,
                minWidth: BUTTON_WIDTH,
                padding: "0.5rem 1rem",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                background: "#f3f3f3",
                color: "#888",
                fontWeight: "bold",
                boxShadow: isOn ? "0 2px 8px #ffe06655" : "0 1px 4px #ccc",
                transition: "background 0.2s, color 0.2s, box-shadow 0.2s, width 0.2s"
            }}
        >
            <span
                style={{
                    width: TEXT_WIDTH,
                    fontSize: 15,
                    marginRight: 10,
                    whiteSpace: "nowrap"
                }}
            >
                {isOn ? "Show All" : "Show Favorites"}
            </span>
            {isOn ? (
                <LiaToggleOnSolid size={30} color="#888" style={{ fill: "#888", filter: "drop-shadow(0 0 2px #fff7b2)" }} />
            ) : (
                <LiaToggleOffSolid size={30} color="#bbb" style={{ fill: "#bbb" }} />
            )}
        </button>
    );
}
