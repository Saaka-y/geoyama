// Filter.jsx

import { useEffect, useState } from "react";


export function Filter({ distance, setDistance, courseTime, setCourseTime }) {

  const allMountains = [
    { name: "Mount Chausu", distance: 2, courseTime: 5 },
    { name: "Mount Tanigawa", distance: 2, courseTime: 1 },
    { name: "Mount Jimba", distance: 1, courseTime: 2 },
    { name: "Mount Nabewari", distance: 1, courseTime: 3 },
    { name: "Mount Oyama", distance: 1, courseTime: 4 },
    { name: "Mount Kintoki", distance: 2, courseTime: 6 },]

  const [mountains, setMountains] = useState([]);

  useEffect(() => {
    let filtered = allMountains;

    if (distance) {
     filtered = filtered.filter(
        (mountain) => mountain.distance <= parseInt(distance)
      );
    }

    if (courseTime) {
      filtered = filtered.filter(
        (mountain) => mountain.courseTime <= parseInt(courseTime)
      );
    }
    console.log("Filtered:", filtered);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMountains(filtered);
  }
    , [distance, courseTime]);


  return (
    <div className="h-1/3 p-4 flex items-start justify-start gap-3">
      <select
        value={distance}
        onChange={(e) => setDistance(e.target.value)}>
        <option value="">Distance from Tokyo</option>
        <option value="1">Within an hour</option>
        <option value="2">Within 2 hours</option>
        <option value="3">Within 3 hours</option>
        <option value="4">Within 4 hours</option>
        <option value="5">Over 5 hours</option>
      </select>

      <select
        value={courseTime}
        onChange={(e) => setCourseTime(e.target.value)}>
        <option value="">Approx course time</option>
        <option value="1">Less than an hour</option>
        <option value="3">Less than 3 hours</option>
        <option value="5">Less than 5 hours</option>
        <option value="7">Less than 7 hours</option>
      </select>

      <div className="mt-2">
        {mountains.length > 0 ? (
          mountains.map((m, i) => (
            <p key={i}>{m.name}</p>
          ))
        ) : (
          <p>No mountains match the filter</p>
        )}
      </div>

    </div>
  );
}
