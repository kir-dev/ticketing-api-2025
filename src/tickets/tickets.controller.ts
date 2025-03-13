import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Prisma } from '@prisma/client';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketDto: Prisma.TicketUncheckedCreateInput) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTicketDto: Prisma.TicketUncheckedUpdateInput,
  ) {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.remove(id);
  }

  @Patch(':ticketId/assign/:labelId')
  addLabel(
    @Param('ticketId', ParseIntPipe) ticketId: number,
    @Param('labelId', ParseIntPipe) labelId: number,
  ) {
    return this.ticketsService.addLabel(ticketId, labelId);
  }

  @Delete(':ticketId/remove/:labelId')
  removeLabel(
    @Param('ticketId', ParseIntPipe) ticketId: number,
    @Param('labelId', ParseIntPipe) labelId: number,
  ) {
    return this.ticketsService.removeLabel(ticketId, labelId);
  }
}
