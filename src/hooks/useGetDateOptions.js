//@/hooks/useGetDateOptions.js
import { useEffect } from "react";
import { useFilterStore } from "@/stores/filterStore";

export function useGetDateOptions() {

  const { dateOptions, initDateOptions } = useFilterStore();

  useEffect(() => {
    initDateOptions();
  }
  , []);

}