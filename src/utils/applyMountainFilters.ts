//@/utils/applyMountainFilters.js

import { MountainFeature } from "@/types/mountain";

interface Props {
  distance: string;
  courseTime: string;
  mountains: MountainFeature[];
}

export function applyMountainFilters({distance, courseTime, mountains}: Props) {

    return mountains.filter(mountain => {
      if (distance && mountain.properties.distance > Number(distance)) return false;
      if (courseTime && mountain.properties.courseTime > Number(courseTime)) return false;
      return true;
    });
  };