import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { LeadsService } from "./leads.service";

@ApiTags("admissions")
@Controller("admission-leads")
export class LeadsController {
  constructor(private readonly leads: LeadsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Request a trial session" })
  @ApiResponse({ status: 201, description: "Lead accepted" })
  create(@Body() input: CreateLeadDto) { return this.leads.create(input); }
}
