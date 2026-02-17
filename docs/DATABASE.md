# Mountain Table Design

## mountain

| Column     | Type   | Description                |
|-----------|--------|---------------------------|
| id        | Int    | Primary key (auto-increment) |
| title     | String | Mountain name              |
| routeKey  | String | Route identifier           |
| distance  | Float  | Distance (km)              |
| courseTime| Float  | Course time (hours)        |
| routeName | String | Route name                 |
| elevation | Int    | Trailhead elevation        |
| summit    | Int    | Summit elevation           |
| carPark   | String | Car park URL (nullable)    |
| station   | String | Station URL (nullable)     |
| longitude | Float  | Longitude                  |
| latitude  | Float  | Latitude                   |

## Prisma Schema Example

```prisma
model Mountain {
  id         Int     @id @default(autoincrement())
  title      String
  routeKey   String
  distance   Float
  courseTime Float
  routeName  String
  elevation  Int
  summit     Int
  carPark    String?
  station    String?
  longitude  Float
  latitude   Float
}
```

# Route Table Design

## Table: route

| Column   | Type   | Description                |
|----------|--------|---------------------------|
| id       | Int    | Primary key (auto-increment) |
| routeKey | String | Route identifier           |
| geojson  | Json   | GeoJSON data (FeatureCollection) |

## Prisma Schema Example

```prisma
model Route {
  id       Int    @id @default(autoincrement())
  routeKey String
  geojson  Json
}
```

This table is designed to store large GeoJSON route data efficiently, referencing routeGeojson files directly.

# SpotPins Table Design

## Table: spotPins

| Column     | Type   | Description                |
|------------|--------|---------------------------|
| id         | Int    | Primary key (auto-increment) |
| mountainId | Int    | Mountain table foreign key |
| name       | String | Pin name                   |
| longitude  | Float  | Longitude                  |
| latitude   | Float  | Latitude                   |
| description| String | Description (nullable)     |

## Prisma Schema Example

```prisma
model SpotPin {
  id         Int     @id @default(autoincrement())
  mountainId Int    // Foreign key
  name       String
  longitude  Float
  latitude   Float
  description String?
  mountain   Mountain @relation(fields: [mountainId], references: [id])
}
```

# User Table Design

## Table: user

| Column     | Type   | Description                |
|------------|--------|---------------------------|
| id         | Int    | Primary key (auto-increment) |
| email      | String | User email (unique)        |
| password   | String | Hashed password            |
| name       | String | User name                  |
| createdAt  | DateTime | Account creation date     |
| updatedAt  | DateTime | Last update date          |

## Prisma Schema Example

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

# UserFavorite Table Design

## Table: userFavorite

| Column     | Type   | Description                |
|------------|--------|---------------------------|
| id         | Int    | Primary key (auto-increment) |
| userId     | Int    | User table foreign key     |
| mountainId | Int    | Mountain table foreign key |
| createdAt  | DateTime | Favorite registration date |

## Prisma Schema Example

```prisma
model UserFavorite {
  id         Int      @id @default(autoincrement())
  userId     Int
  mountainId Int
  createdAt  DateTime @default(now())

  user       User     @relation(fields: [userId], references: [id])
  mountain   Mountain @relation(fields: [mountainId], references: [id])

  @@unique([userId, mountainId]) // Prevent duplicate favorites
}
```
