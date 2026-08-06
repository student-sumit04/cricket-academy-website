import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { HealthModule } from "./modules/health/health.module";
import { LeadsModule } from "./modules/leads/leads.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid("development", "test", "production").default("development"),
        PORT: Joi.number().port().default(4000),
        CORS_ORIGINS: Joi.string().default("http://localhost:3000"),
        DATABASE_URL: Joi.string().required(),
        REDIS_URL: Joi.string().uri().optional(),
        JWT_ACCESS_SECRET: Joi.string().min(32).required(),
        JWT_REFRESH_SECRET: Joi.string().min(32).required(),
        RAZORPAY_KEY_ID: Joi.string().allow("").optional(),
        RAZORPAY_KEY_SECRET: Joi.string().allow("").optional(),
        RAZORPAY_WEBHOOK_SECRET: Joi.string().allow("").optional()
      })
    }),
    PrismaModule,
    HealthModule,
    LeadsModule
  ]
})
export class AppModule {}
