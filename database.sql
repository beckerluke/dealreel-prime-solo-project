
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "business_name" VARCHAR (100) NOT NULL,
    "email" VARCHAR UNIQUE NOT NULL,
    "phone_number" INTEGER (255),
    "address" VARCHAR UNIQUE NOT NULL,
    "type" VARCHAR (100),
    "sec_level" INTEGER DEFAULT 1
);

CREATE TABLE "deals" (
    "id" SERIAL PRIMARY KEY,
    "start_time" TIMESTAMP,
    "end_time" TIMESTAMP,
    "description" VARCHAR(100) not null,
    "location" VARCHAR(255) not null
);

CREATE TABLE "user_deals" (
    "id" serial primary key,
    "user_id" INT REFERENCES "user",
    "deals_id" INT REFERENCES "deals"
);