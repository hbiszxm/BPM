CREATE TABLE "INTERNAL_PROPERTIES"(
    "KEE" CHARACTER VARYING(20) NOT NULL,
    "IS_EMPTY" BOOLEAN NOT NULL,
    "TEXT_VALUE" CHARACTER VARYING(4000),
    "CLOB_VALUE" CHARACTER LARGE OBJECT,
    "CREATED_AT" BIGINT NOT NULL
);
ALTER TABLE "INTERNAL_PROPERTIES" ADD CONSTRAINT "PK_INTERNAL_PROPERTIES" PRIMARY KEY("KEE");