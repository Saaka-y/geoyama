// scripts/seedMountains.ts
import "dotenv/config";
import { prisma } from "../src/lib/prisma";
import mountains from "../src/data/allMountains.json";

async function main() {
  for (const feature of mountains.features) {
    const p = feature.properties;
    const [longitude, latitude] = feature.geometry.coordinates;
    await prisma.mountain.create({
      data: {
        title: p.title,
        routeKey: p.routeKey,
        routeName: p.routeName || '',
        description: '',
        distance: p.distance,
        courseTime: p.courseTime,
        elevation: p.elevation,
        summit: p.summit,
        fitness: '',
        carPark: p.carPark || null,
        station: p.station || null,
        longitude,
        latitude,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
