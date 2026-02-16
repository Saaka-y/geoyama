//@/utils/applyMountainFilters.js

import { MountainFeature } from "@/types/mountain";

interface Props {
  distance: number;
  courseTime: number;
  mountains: MountainFeature[];
}

export function applyMountainFilters({distance, courseTime, mountains}: Props) {

    return mountains.filter(mountain => {
      if (distance && mountain.properties.distance > distance) return false;
      if (courseTime && mountain.properties.courseTime > courseTime) return false;
      return true;
    });
  };