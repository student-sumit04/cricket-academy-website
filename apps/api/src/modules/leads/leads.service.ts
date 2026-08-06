import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateLeadDto } from "./dto/create-lead.dto";

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateLeadDto) {
    const lead = await this.prisma.admissionLead.create({
      data: { ...input, phone: input.phone.replace(/[\s()-]/g, ""), consentAt: new Date() },
      select: { id: true, status: true, createdAt: true }
    });
    return { data: lead };
  }
}
