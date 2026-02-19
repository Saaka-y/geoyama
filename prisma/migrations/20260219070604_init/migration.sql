-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Mountain" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "routeKey" TEXT NOT NULL,
    "routeName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "distance" REAL NOT NULL,
    "courseTime" REAL NOT NULL,
    "elevation" REAL NOT NULL,
    "summit" INTEGER NOT NULL,
    "fitness" TEXT NOT NULL,
    "carPark" TEXT,
    "station" TEXT,
    "longitude" REAL NOT NULL,
    "latitude" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "MountainGallery" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "mountainId" INTEGER NOT NULL,
    CONSTRAINT "MountainGallery_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserFavorite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "mountainId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserFavorite_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserFavorite_userId_mountainId_key" ON "UserFavorite"("userId", "mountainId");
