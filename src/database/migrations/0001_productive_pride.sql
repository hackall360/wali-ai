CREATE TYPE "public"."webhook_type" AS ENUM('DEEP_DESERT');--> statement-breakpoint
CREATE TABLE "webhook_channels" (
	"id" text PRIMARY KEY NOT NULL,
	"guild_id" text NOT NULL,
	"channel_id" text NOT NULL,
	"webhook_id" text NOT NULL,
	"webhook_token" text NOT NULL,
	"webhookType" "webhook_type" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "webhook_channels" ADD CONSTRAINT "webhook_channels_guild_id_guilds_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guilds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "webhook_channels_guild_idx" ON "webhook_channels" USING btree ("guild_id");--> statement-breakpoint
CREATE INDEX "webhook_channels_channel_idx" ON "webhook_channels" USING btree ("channel_id");--> statement-breakpoint
CREATE INDEX "webhook_channels_broadcast_types_idx" ON "webhook_channels" USING btree ("webhookType");--> statement-breakpoint
CREATE INDEX "guilds_locale_idx" ON "guilds" USING btree ("locale");