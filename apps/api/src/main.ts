import "reflect-metadata";
import helmet from "helmet";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService);
  const port = config.getOrThrow<number>("PORT");
  const origins = config.getOrThrow<string>("CORS_ORIGINS").split(",");

  app.setGlobalPrefix("v1");
  app.use(helmet());
  app.enableCors({ origin: origins, credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.enableShutdownHooks();

  if (config.get("NODE_ENV") !== "production") {
    const swaggerConfig = new DocumentBuilder().setTitle("The Crease API").setDescription("Academy operations API").setVersion("1.0").addBearerAuth().build();
    SwaggerModule.setup("docs", app, SwaggerModule.createDocument(app, swaggerConfig));
  }

  await app.listen(port, "0.0.0.0");
}

void bootstrap();
