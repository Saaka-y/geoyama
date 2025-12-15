//@/hooks/useGetDateOptions.js
import { useEffect } from "react";
import { useFilterStore } from "@/stores/filterStore";

export function useGetDateOptions() {

  const { initDateOptions } = useFilterStore();

  useEffect(() => {
    initDateOptions();
  }
  , []);

}