// /data/allRoutes.jsx

export const allRoutes = import.meta.glob("/routeGeojson/*.geojson", {
  eager: true,
});
