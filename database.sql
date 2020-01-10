CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "business_name" VARCHAR (100) NOT NULL,
    "email" VARCHAR UNIQUE NOT NULL,
    "phone_number" INTEGER (255),
    "address" VARCHAR UNIQUE NOT NULL,
    "sec_level" INTEGER DEFAULT 2
);

CREATE TABLE "deals" (
    "id" SERIAL PRIMARY KEY,
    "start_time" timestamp with time zone NOT NULL,
    "end_time" timestamp with time zone NOT NULL,
    "description" character varying(200) NOT NULL,
    "user_id" integer REFERENCES user(id),
    "redemptions_limit" integer NOT NULL DEFAULT 0,
);