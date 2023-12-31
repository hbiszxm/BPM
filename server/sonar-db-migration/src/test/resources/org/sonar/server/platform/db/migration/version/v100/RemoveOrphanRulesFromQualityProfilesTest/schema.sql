CREATE TABLE "RULES"(
    "UUID" CHARACTER VARYING(40) NOT NULL,
    "NAME" CHARACTER VARYING(200),
    "PLUGIN_RULE_KEY" CHARACTER VARYING(200) NOT NULL,
    "PLUGIN_KEY" CHARACTER VARYING(200),
    "PLUGIN_CONFIG_KEY" CHARACTER VARYING(200),
    "PLUGIN_NAME" CHARACTER VARYING(255) NOT NULL,
    "SCOPE" CHARACTER VARYING(20) NOT NULL,
    "PRIORITY" INTEGER,
    "STATUS" CHARACTER VARYING(40),
    "LANGUAGE" CHARACTER VARYING(20),
    "DEF_REMEDIATION_FUNCTION" CHARACTER VARYING(20),
    "DEF_REMEDIATION_GAP_MULT" CHARACTER VARYING(20),
    "DEF_REMEDIATION_BASE_EFFORT" CHARACTER VARYING(20),
    "GAP_DESCRIPTION" CHARACTER VARYING(4000),
    "SYSTEM_TAGS" CHARACTER VARYING(4000),
    "IS_TEMPLATE" BOOLEAN DEFAULT FALSE NOT NULL,
    "DESCRIPTION_FORMAT" CHARACTER VARYING(20),
    "RULE_TYPE" TINYINT,
    "SECURITY_STANDARDS" CHARACTER VARYING(4000),
    "IS_AD_HOC" BOOLEAN NOT NULL,
    "IS_EXTERNAL" BOOLEAN NOT NULL,
    "CREATED_AT" BIGINT,
    "UPDATED_AT" BIGINT,
    "TEMPLATE_UUID" CHARACTER VARYING(40),
    "NOTE_DATA" CHARACTER LARGE OBJECT,
    "NOTE_USER_UUID" CHARACTER VARYING(255),
    "NOTE_CREATED_AT" BIGINT,
    "NOTE_UPDATED_AT" BIGINT,
    "REMEDIATION_FUNCTION" CHARACTER VARYING(20),
    "REMEDIATION_GAP_MULT" CHARACTER VARYING(20),
    "REMEDIATION_BASE_EFFORT" CHARACTER VARYING(20),
    "TAGS" CHARACTER VARYING(4000),
    "AD_HOC_NAME" CHARACTER VARYING(200),
    "AD_HOC_DESCRIPTION" CHARACTER LARGE OBJECT,
    "AD_HOC_SEVERITY" CHARACTER VARYING(10),
    "AD_HOC_TYPE" TINYINT,
    "EDUCATION_PRINCIPLES" CHARACTER VARYING(255)
);
ALTER TABLE "RULES" ADD CONSTRAINT "PK_RULES" PRIMARY KEY("UUID");
CREATE UNIQUE INDEX "RULES_REPO_KEY" ON "RULES"("PLUGIN_RULE_KEY" NULLS FIRST, "PLUGIN_NAME" NULLS FIRST);

CREATE TABLE "RULES_PROFILES"(
    "UUID" CHARACTER VARYING(40) NOT NULL,
    "NAME" CHARACTER VARYING(100) NOT NULL,
    "LANGUAGE" CHARACTER VARYING(20),
    "IS_BUILT_IN" BOOLEAN NOT NULL,
    "RULES_UPDATED_AT" CHARACTER VARYING(100),
    "CREATED_AT" TIMESTAMP,
    "UPDATED_AT" TIMESTAMP
);
ALTER TABLE "RULES_PROFILES" ADD CONSTRAINT "PK_RULES_PROFILES" PRIMARY KEY("UUID");

CREATE TABLE "ACTIVE_RULES"(
    "UUID" CHARACTER VARYING(40) NOT NULL,
    "FAILURE_LEVEL" INTEGER NOT NULL,
    "INHERITANCE" CHARACTER VARYING(10),
    "CREATED_AT" BIGINT,
    "UPDATED_AT" BIGINT,
    "PROFILE_UUID" CHARACTER VARYING(40) NOT NULL,
    "RULE_UUID" CHARACTER VARYING(40) NOT NULL
);
ALTER TABLE "ACTIVE_RULES" ADD CONSTRAINT "PK_ACTIVE_RULES" PRIMARY KEY("UUID");
CREATE UNIQUE INDEX "UNIQ_PROFILE_RULE_UUIDS" ON "ACTIVE_RULES"("PROFILE_UUID" NULLS FIRST, "RULE_UUID" NULLS FIRST);

CREATE TABLE "QPROFILE_CHANGES"(
    "KEE" CHARACTER VARYING(40) NOT NULL,
    "RULES_PROFILE_UUID" CHARACTER VARYING(255) NOT NULL,
    "CHANGE_TYPE" CHARACTER VARYING(20) NOT NULL,
    "USER_UUID" CHARACTER VARYING(255),
    "CHANGE_DATA" CHARACTER LARGE OBJECT,
    "CREATED_AT" BIGINT NOT NULL
);
ALTER TABLE "QPROFILE_CHANGES" ADD CONSTRAINT "PK_QPROFILE_CHANGES" PRIMARY KEY("KEE");
CREATE INDEX "QP_CHANGES_RULES_PROFILE_UUID" ON "QPROFILE_CHANGES"("RULES_PROFILE_UUID" NULLS FIRST);
