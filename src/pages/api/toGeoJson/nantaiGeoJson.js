// pages/api/toGeoJson/nantaiGeoJson.js
import fs from 'fs';
import path from 'path';
import { DOMParser } from '@xmldom/xmldom';
import { gpx } from '@mapbox/togeojson';

export default function NabewariGeoJson(req, res) {
  try {
    // GPXファイルパス
    const gpxFilePath = path.join(process.cwd(), 'public','GPX', 'Nantai.gpx');

    // ファイル読み込み
    const gpxData = fs.readFileSync(gpxFilePath, 'utf-8');

    // DOM に変換
    const dom = new DOMParser().parseFromString(gpxData, 'text/xml');

    // GeoJSON に変換
    const trailGeojson = gpx(dom);

    res.status(200).json({ trailGeojson });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to convert GPX to GeoJSON' });
  }
}
