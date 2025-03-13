import { ApiProperty } from '@nestjs/swagger';
import { TicketPhase } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class Ticket {
  @IsNumber()
  @Min(1)
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(TicketPhase)
  @ApiProperty({ enum: TicketPhase })
  phase: TicketPhase;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAT: Date;

  @IsNumber()
  boardId: number;
}
