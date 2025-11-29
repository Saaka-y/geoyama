// scripts/saveTrailGeojson.js
import fs from 'fs';
import path from 'path';
import { DOMParser } from '@xmldom/xmldom';
import pkg from '@mapbox/togeojson'; // ← 変更
const { gpx } = pkg; // ← 変更

const mountains = [
  { name: "Nantai", gpxFile: "Nantai.gpx" },
  { name: "Kinpu", gpxFile: "Kinpu.gpx" },
  { name: "Kintoki", gpxFile: "Kintoki.gpx" },
  { name: "Nabewari", gpxFile: "Nabewari.gpx" },
  // 他の山も追加
];

mountains.forEach(({ name, gpxFile }) => {
  try {
    const gpxFilePath = path.join(process.cwd(), 'public', 'GPX', gpxFile);
    const gpxData = fs.readFileSync(gpxFilePath, 'utf-8');
    const dom = new DOMParser().parseFromString(gpxData, 'text/xml');
    const trailGeojson = gpx(dom);

    // GeoJSON を保存
    const outputPath = path.join(process.cwd(), 'routeGeojson', `${name}.geojson`);
    fs.writeFileSync(outputPath, JSON.stringify(trailGeojson, null, 2));

    console.log(`${name}.geojson saved!`);
  } catch (err) {
    console.error(`Failed to process ${name}:`, err);
  }
});