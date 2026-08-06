import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PrismaService } from "../../prisma/prisma.service";

@ApiTags("health")
@Controller("health")
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get("live")
  @ApiOperation({ summary: "Process liveness probe" })
  live() { return { status: "ok", timestamp: new Date().toISOString() }; }

  @Get("ready")
  @ApiOperation({ summary: "Database readiness probe" })
  async ready() {
    await this.prisma.$queryRaw`SELECT 1`;
    return { status: "ready", database: "connected", timestamp: new Date().toISOString() };
  }
}
