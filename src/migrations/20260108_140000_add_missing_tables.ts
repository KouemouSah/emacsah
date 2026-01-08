import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Create missing ENUMs (if they don't exist)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_comments_status" AS ENUM('pending', 'approved', 'spam', 'deleted');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_contact_messages_subject" AS ENUM('job', 'collaboration', 'freelance', 'technical', 'other');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_contact_messages_status" AS ENUM('new', 'read', 'replied', 'archived', 'spam');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `)

  // Create comments table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "comments" (
      "id" serial PRIMARY KEY NOT NULL,
      "article_id" integer NOT NULL,
      "parent_id" integer,
      "author_name" varchar NOT NULL,
      "author_email" varchar NOT NULL,
      "author_website" varchar,
      "content" varchar NOT NULL,
      "status" "enum_comments_status" DEFAULT 'pending' NOT NULL,
      "ip_address" varchar,
      "user_agent" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `)

  // Create contact_messages table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "contact_messages" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "email" varchar NOT NULL,
      "phone" varchar,
      "company" varchar,
      "subject" "enum_contact_messages_subject" NOT NULL,
      "message" varchar NOT NULL,
      "status" "enum_contact_messages_status" DEFAULT 'new' NOT NULL,
      "notes" varchar,
      "ip_address" varchar,
      "user_agent" varchar,
      "email_sent" boolean DEFAULT false,
      "email_error" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `)

  // Create tags table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "tags" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `)

  // Add missing columns to payload_locked_documents_rels
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
    ADD COLUMN IF NOT EXISTS "technologies_id" integer,
    ADD COLUMN IF NOT EXISTS "comments_id" integer,
    ADD COLUMN IF NOT EXISTS "contact_messages_id" integer,
    ADD COLUMN IF NOT EXISTS "tags_id" integer;
  `)

  // Create foreign keys for comments
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "comments" ADD CONSTRAINT "comments_article_id_articles_id_fk"
        FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_id_comments_id_fk"
        FOREIGN KEY ("parent_id") REFERENCES "public"."comments"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `)

  // Create foreign keys for payload_locked_documents_rels
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_technologies_fk"
        FOREIGN KEY ("technologies_id") REFERENCES "public"."technologies"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_comments_fk"
        FOREIGN KEY ("comments_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_messages_fk"
        FOREIGN KEY ("contact_messages_id") REFERENCES "public"."contact_messages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk"
        FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `)

  // Create indexes
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "comments_article_idx" ON "comments" USING btree ("article_id");
    CREATE INDEX IF NOT EXISTS "comments_parent_idx" ON "comments" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "comments_updated_at_idx" ON "comments" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "comments_created_at_idx" ON "comments" USING btree ("created_at");

    CREATE INDEX IF NOT EXISTS "contact_messages_updated_at_idx" ON "contact_messages" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "contact_messages_created_at_idx" ON "contact_messages" USING btree ("created_at");

    CREATE UNIQUE INDEX IF NOT EXISTS "tags_name_idx" ON "tags" USING btree ("name");
    CREATE UNIQUE INDEX IF NOT EXISTS "tags_slug_idx" ON "tags" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "tags_created_at_idx" ON "tags" USING btree ("created_at");

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_technologies_id_idx" ON "payload_locked_documents_rels" USING btree ("technologies_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_comments_id_idx" ON "payload_locked_documents_rels" USING btree ("comments_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_contact_messages_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_messages_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Remove columns from payload_locked_documents_rels
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
    DROP COLUMN IF EXISTS "technologies_id",
    DROP COLUMN IF EXISTS "comments_id",
    DROP COLUMN IF EXISTS "contact_messages_id",
    DROP COLUMN IF EXISTS "tags_id";
  `)

  // Drop tables
  await db.execute(sql`
    DROP TABLE IF EXISTS "comments" CASCADE;
    DROP TABLE IF EXISTS "contact_messages" CASCADE;
    DROP TABLE IF EXISTS "tags" CASCADE;
  `)

  // Drop types
  await db.execute(sql`
    DROP TYPE IF EXISTS "public"."enum_comments_status";
    DROP TYPE IF EXISTS "public"."enum_contact_messages_subject";
    DROP TYPE IF EXISTS "public"."enum_contact_messages_status";
  `)
}
