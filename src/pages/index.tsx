// pages/index.jsx

import { useRef, useEffect } from "react";
import { useFilterStore } from "@/stores/filterStore";
import { useUserStore } from "@/stores/userStore";
import { useSession } from "next-auth/react";
import { MainView } from "@/components/MainView/MainView";

export default function Home() {
    const { initDateOptions } = useFilterStore();
    const { isLoggedIn, setIsLoggedIn } = useUserStore();
    const { data: session } = useSession();

    //**************************/
    // Mapbox instance /
    //**************************/
    const japanMapRef = useRef(null);
    const focusMapRef = useRef(null);

    useEffect(() => {
        initDateOptions();
    }, [initDateOptions]);

    useEffect(() => {
        setIsLoggedIn(!!session);
        console.log("User authenticated:", {
            id: session?.user?.id,
            email: session?.user?.email,
        });
    }, [session, setIsLoggedIn]);

    console.log("Login status:", isLoggedIn);

    return <MainView japanMapRef={japanMapRef} focusMapRef={focusMapRef} />;
}
