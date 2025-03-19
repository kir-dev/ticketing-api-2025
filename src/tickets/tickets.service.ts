import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { TicketWithLabels } from './entities/ticket-with-labels.entity';

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTicketDto: Prisma.TicketUncheckedCreateInput) {
    try {
      return await this.prisma.ticket.create({
        data: createTicketDto,
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Could not create ticket');
    }
  }

  async findAll(): Promise<TicketWithLabels[]> {
    return await this.prisma.ticket.findMany({
      include: {
        labels: true,
      },
    });
  }

  async findOne(id: number): Promise<TicketWithLabels> {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      include: {
        labels: true,
      },
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with id ${id} not found`);
    }

    return ticket;
  }

  async update(id: number, updateTicketDto: Prisma.TicketUncheckedUpdateInput) {
    try {
      return this.prisma.ticket.update({
        where: { id },
        data: updateTicketDto,
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException(`Could not create ticket with id ${id}`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.ticket.delete({
        where: { id },
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException(`Could not delete ticket with id ${id}`);
    }
  }

  async assignLabel(
    ticketId: number,
    labelId: number,
  ): Promise<TicketWithLabels> {
    try {
      return await this.prisma.ticket.update({
        where: { id: ticketId },
        data: {
          labels: {
            connect: { id: labelId },
          },
        },
        include: {
          labels: true,
        },
      });
    } catch (e) {
      console.error(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(e.message);
      }
      throw new BadRequestException(`Could not assign label to ticket`);
    }
  }

  async removeLabel(
    ticketId: number,
    labelId: number,
  ): Promise<TicketWithLabels> {
    try {
      return await this.prisma.ticket.update({
        where: { id: ticketId },
        data: {
          labels: {
            disconnect: { id: labelId },
          },
        },
        include: {
          labels: true,
        },
      });
    } catch (e) {
      console.error(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(e.message);
      }
      throw new BadRequestException(`Could not remove label from ticket`);
    }
  }
}
