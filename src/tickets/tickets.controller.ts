import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketWithLabels } from './entities/ticket-with-labels.entity';
import { Ticket } from './entities/ticket.entity';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiBody({ type: CreateTicketDto })
  create(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  findAll(): Promise<TicketWithLabels[]> {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TicketWithLabels> {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTicketDto: Prisma.TicketUncheckedUpdateInput,
  ): Promise<Ticket> {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Ticket> {
    return this.ticketsService.remove(id);
  }

  @Patch(':ticketId/assign/:labelId')
  assignLabel(
    @Param('ticketId', ParseIntPipe) ticketId: number,
    @Param('labelId', ParseIntPipe) labelId: number,
  ): Promise<TicketWithLabels> {
    return this.ticketsService.assignLabel(ticketId, labelId);
  }

  @Delete(':ticketId/assign/:labelId')
  removeLabel(
    @Param('ticketId', ParseIntPipe) ticketId: number,
    @Param('labelId', ParseIntPipe) labelId: number,
  ): Promise<TicketWithLabels> {
    return this.ticketsService.removeLabel(ticketId, labelId);
  }
}
