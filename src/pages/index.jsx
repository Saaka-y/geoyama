// pages/index.jsx

import { useRef } from "react";
import { MainView } from "@/components/MainView/MainView";

export default function Home() {

   //**************************/
  // Mapbox instance /
  //**************************/
  const japanMapRef = useRef();
  const focusMapRef = useRef();

  return (
    <MainView 
      japanMapRef={japanMapRef}
      focusMapRef={focusMapRef}
    />
  );
}
