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
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  findAll(): Promise<Ticket[]> {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Ticket> {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket> {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Ticket> {
    return this.ticketsService.remove(id);
  }

  @Patch(':ticketId/assign/:labelId')
  addLabel(
    @Param('ticketId', ParseIntPipe) ticketId: number,
    @Param('labelId', ParseIntPipe) labelId: number,
  ): Promise<Ticket> {
    return this.ticketsService.addLabel(ticketId, labelId);
  }

  @Delete(':ticketId/remove/:labelId')
  removeLabel(
    @Param('ticketId', ParseIntPipe) ticketId: number,
    @Param('labelId', ParseIntPipe) labelId: number,
  ): Promise<Ticket> {
    return this.ticketsService.removeLabel(ticketId, labelId);
  }
}
