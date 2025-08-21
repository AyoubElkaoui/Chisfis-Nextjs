-- CreateTable
CREATE TABLE "City" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Cleaner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "phoneE164" TEXT,
    "bio" TEXT,
    "photoUrl" TEXT,
    "cityId" INTEGER NOT NULL,
    "rating" REAL,
    "pricePerHour" INTEGER,
    "services" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Cleaner_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BookingRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cleanerId" INTEGER,
    "cityId" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneE164" TEXT NOT NULL,
    "preferredDate" DATETIME NOT NULL,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "BookingRequest_cleanerId_fkey" FOREIGN KEY ("cleanerId") REFERENCES "Cleaner" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "BookingRequest_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- CreateIndex
CREATE UNIQUE INDEX "City_slug_key" ON "City"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Cleaner_slug_key" ON "Cleaner"("slug");
