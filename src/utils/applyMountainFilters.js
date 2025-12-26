//@/utils/applyMoutnainFilters.js

export function applyMoutnainFilters(distance, courseTime, mountains) {

    return mountains.filter(mountain => {
      if (distance && mountain.properties.distance > distance) return false;
      if (courseTime && mountain.properties.courseTime > courseTime) return false;
      return true;
    });
  };