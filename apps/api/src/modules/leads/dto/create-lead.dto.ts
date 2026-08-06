import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsIn, IsInt, IsOptional, IsPhoneNumber, IsString, Max, MaxLength, Min } from "class-validator";

export class CreateLeadDto {
  @ApiProperty({ example: "Aarav Sharma", maxLength: 100 })
  @IsString() @MaxLength(100)
  playerName: string;

  @ApiProperty({ example: 12, minimum: 6, maximum: 25 })
  @IsInt() @Min(6) @Max(25)
  playerAge: number;

  @ApiProperty({ example: "+919876543210" })
  @IsPhoneNumber("IN")
  phone: string;

  @ApiPropertyOptional({ example: "parent@example.com" })
  @IsOptional() @IsEmail() @MaxLength(254)
  email?: string;

  @ApiProperty({ enum: ["FOUNDATION", "PERFORMANCE", "ELITE"] })
  @IsIn(["FOUNDATION", "PERFORMANCE", "ELITE"])
  interest: "FOUNDATION" | "PERFORMANCE" | "ELITE";
}
